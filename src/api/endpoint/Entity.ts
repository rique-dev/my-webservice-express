import { Model, model } from 'mongoose';
import { IEntity, IEntityDocument } from './base/Interfaces';
import Schema from './base/Schema';

export default model<IEntityDocument>('Entity', Schema);