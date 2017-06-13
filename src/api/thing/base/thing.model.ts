import { Model, model } from 'mongoose';
import { ThingDocument } from './thing';
import ThingSchema from './thing.schema';

export default model<ThingDocument>('Thing', ThingSchema);
