import { Document, SchemaDefinition } from 'mongoose';

export interface Thing {
    name: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface ThingDefinition extends SchemaDefinition { }

export interface ThingDocument extends Document, Thing { }
