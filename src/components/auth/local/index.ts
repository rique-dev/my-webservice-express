import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { AuthService } from '../auth.provider';
import { UserDocument } from '../../../api/user/user';
import { HttpNotFound, HttpUnauthorized } from '../../handles';


export class Local {

    static get router(): Router {
        const router: Router = Router();
        router.post('/', this.fn);
        return router;
    }
    private static get fn() {
        return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate('local', (err: Error, user: UserDocument, info: any) => {
                const error = err || info;
                if (error) {
                    return HttpUnauthorized(res);
                }
                if (!user) {
                    return HttpNotFound(res, 'Something went wrong, please try again.');
                }
                const token = AuthService.signToken(user._id, user.role);
                res.json({ token });
            })(req, res, next);
        };
    }
}

export default Local.router;
