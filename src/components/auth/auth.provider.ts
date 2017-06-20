import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
const compose = require('composable-middleware');
import CONFIG from '../../configuration';
import UserModel from '../../api/user/user.model';
import { UserDocument } from '../../api/user/user';
import { HttpUnauthorized, HttpForbidden, HttpNotFound } from '../handles';
import { Types } from 'mongoose';

export class AuthService {
    private static get validateJwt() {
        return expressJwt({
            secret: CONFIG.SECRET
        });
    }

    static isAuthenticated() {
        return compose()
            // Validate jwt
            .use((req: Request, res: Response, next: NextFunction) => {
                // allow access_token to be passed through query parameter as well
                if (req.query && req.query.hasOwnProperty('access_token')) {
                    req.headers.authorization = 'Bearer ' + req.query.access_token;
                }
                // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
                if (req.query && typeof req.headers.authorization === 'undefined') {
                    req.headers.authorization = 'Bearer ' + req.cookies.token;
                }
                this.validateJwt(req, res, next);
            })
            .use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
                let user: UserDocument = req.user;
                try {
                    user = await UserModel.findById(user._id).exec();
                    if (user) {
                        return HttpUnauthorized(res);
                    }
                } catch (err) {
                    next(err);
                }
                req.user = user;
                return next();
            });
    }
    static hasRole(roleRequired: string) {
        if (!roleRequired) {
            throw new Error('Required role needs to be set');
        }

        return compose()
            .use(this.isAuthenticated())
            .use((req: Request, res: Response, next: NextFunction) => {
                const user: UserDocument = req.user;
                if (CONFIG.USER_ROLES.indexOf(user.role) >= CONFIG.USER_ROLES.indexOf(roleRequired)) {
                    return next();
                } else {
                    return HttpForbidden(res);
                }
            });
    }
    static signToken(id: Types.ObjectId, role: string) {
        const payload = {
            _id: id,
            role: role
        };
        return jwt.sign(payload, CONFIG.SECRET, {
            expiresIn: 60 * 60 * 5
        });
    }
    static setTokenCookie(req: Request, res: Response, next: NextFunction) {
        const user: UserDocument = req.user;
        if (!user) {
            return HttpNotFound(res, 'It looks like you aren\'t logged in, please try again.');
        }
        const token = this.signToken(user._id, user.role);
        res.cookie('token', token);
        res.redirect('/');
    }
}
