import { IModel } from '../IModel';

export interface IEntity {
    name: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEntityModel extends IEntity, IModel { }