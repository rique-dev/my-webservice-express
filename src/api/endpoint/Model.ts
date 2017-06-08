import { Model, model } from 'mongoose';
import { IEntity, IEntityModel } from './IEntity';
import Schema from './Schema';

export const Entity: Model<IEntityModel> = model<IEntityModel>('Entity', Schema);