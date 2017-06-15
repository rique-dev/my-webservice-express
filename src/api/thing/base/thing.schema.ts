import { Schema } from 'mongoose';
import { Thing } from './thing';

class ThingSchema {

    public static get schema() {
        const schema = new Schema;
        schema.add(this.struct());
        schema.pre('save', this.preSave());
        schema.method('myMethod', this.myMethod());
        return schema;
    }

    private static preSave() {
        function save(next: any) {
            const thing: Thing = this;
            if (!thing.createdAt) {
                thing.createdAt = new Date();
            }
            thing.updatedAt = new Date();
            next();
        }
        return save;
    }

    private static myMethod() {
        function method() {
            // ..
        }
        return method;
    }

    private static struct() {
        return {
            name: String,
            createdAt: Date,
            updatedAt: Date
        };
    }
}

export default ThingSchema.schema;
