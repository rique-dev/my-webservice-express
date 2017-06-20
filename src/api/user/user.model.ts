import { Model, Document } from 'mongoose';
import EntityModel from './../../components/endpoint/Model';
import { UserDefinition, ROLE, User } from './user';
import * as crypto from 'crypto';

export class UserModel extends Model {

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
                default: ROLE.USER
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
    public onInit() {
        this.schema.method();
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
