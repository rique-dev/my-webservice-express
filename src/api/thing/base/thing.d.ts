import { Document } from 'mongoose';

export interface Thing {
    name: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface ThingDocument extends Document, Thing { }
