import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserEntityModel, { UserModel } from './../api/user/user.model';
import { UserDocument } from './../api/user/user';

function localAuthenticate(User: UserModel, email: string, password: string, done: Function) {
    UserEntityModel.findOne({
        email: email.toLowerCase()
    })
        .exec()
        .then((user: UserDocument) => {
            if (!user) {
                return done(undefined, false, {
                    message: 'This email is not registered.'
                });
            }
            user.authenticate(password, (authError: any, authenticated: any) => {
                if (authError) {
                    return done(authError);
                }
                if (!authenticated) {
                    return done(undefined, false, { message: 'This password is not correct.' });
                } else {
                    return done(undefined, user);
                }
            });
        })
        .catch((err: any) => done(err));
}

export function setup(User: UserModel) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, (email, password, done) => {
        return localAuthenticate(User, email, password, done);
    }));
}
