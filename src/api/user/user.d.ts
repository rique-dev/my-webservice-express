import { Document, SchemaDefinition } from 'mongoose';
import { Passport } from 'passport';

export interface User {
    username: string;
    fisrtName: string;
    lastName: string;
    password: Buffer;
    isAdmin: Boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDefinition extends SchemaDefinition { }
export interface UserDocument extends Document, User, Passport { }
