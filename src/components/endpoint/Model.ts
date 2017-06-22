import { Model, model, Schema, SchemaDefinition, Document } from 'mongoose';
import { Entity } from './endpoint';

export default class EntityModel {
    constructor(public modelName: string, public schema?: Schema) {
        this.schema = schema ? schema : new Schema;
        this.modelName = modelName;
        this.schema.add(this.struct());
        this.schema.pre('save', this.preSave());
        this.schema.pre('findOneAndUpdate', this.preFindOneAndUpdate());
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
    private preFindOneAndUpdate() {
        function update(next: any) {
            this.update({}, { $set: { updatedAt: new Date() } });
            next();
        }
        return update;
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
