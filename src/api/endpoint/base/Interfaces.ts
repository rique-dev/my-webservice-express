import { Document } from 'mongoose';

export interface IEntity {
    name: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEntityDocument extends IEntity, Document { }