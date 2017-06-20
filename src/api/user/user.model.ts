import { Model, Document } from 'mongoose';
import EntityModel from './../../components/endpoint/Model';
import { UserDefinition, User } from './user';
import CONFIG from '../../configuration';
import * as crypto from 'crypto';

export class UserModel extends EntityModel {

    constructor(public modelName: string) {
        super(modelName);
        this.schema.methods.validPassword = this.validPassword;
    }

    public struct(): UserDefinition {
        const user: UserDefinition = {
            username: {
                type: String,
                unique: true,
                required: true
            },
            fisrtName: String,
            lastName: String,
            password: Buffer,
            isAdmin: Boolean,
            isEnable: Boolean,
            isDeleted: Boolean,
            role: {
                type: String,
                default: CONFIG.ROLE_USER
            },
            facebook: {
                id: String,
                token: String,
                email: String,
                name: String
            },
            google: {
                id: String,
                token: String,
                email: String,
                name: String
            }
        };
        return super.struct(user);
    }
    private get validPassword(): Function {
        return function (password: string) {
            const user: User = this;
            const hash = crypto.pbkdf2Sync(password, user.password, 10000, 512, 'sha512').toString('hex');
            return this.hash === hash;
        };
    }
}

export default new UserModel('User').model;
