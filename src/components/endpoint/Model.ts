import { Model, model, Schema, SchemaDefinition, Document } from 'mongoose';
import { Entity } from './endpoint';

export default class EntityModel {
    constructor(public modelName: string, public schema?: Schema) {
        this.schema = schema ? schema : new Schema;
        this.modelName = modelName;
        this.schema.add(this.struct());
        this.schema.pre('save', this.preSave());
    }
    public get model(): Model<Document> {
        return model<Document>(this.modelName, this.schema);
    }
    public struct(entity?: SchemaDefinition): SchemaDefinition {
        if (!entity) {
            entity = {};
        }

        const _entity: SchemaDefinition = {
            name: String,
            createdAt: Date,
            updatedAt: Date
        };

        return Object.assign(_entity, entity);
    }
    private preSave() {
        function save(next: any) {
            const thing: Entity = this;
            if (!thing.createdAt) {
                thing.createdAt = new Date();
            }
            thing.updatedAt = new Date();
            next();
        }
        return save;
    }
}
