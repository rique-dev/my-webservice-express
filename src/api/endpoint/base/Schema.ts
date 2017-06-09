import { Schema } from 'mongoose';

class EndpointSchema {
    public schema: Schema;

    constructor() {
        this.schema = new Schema(this.struct)
            .pre('save', this.preSave)
            .method('myMethod', this.myMethod);
    }

    private get struct() {
        return {
            name: String,
            createdAt: Date,
            updatedAt: Date
        };
    }

    private get myMethod() {
        return function (myParam: string) {
            // ...
        };
    }

    private get preSave() {
        return function (next: any) {
            if (!this.createdAt) {
                this.createdAt = new Date();
            }
            this.updatedAt = new Date();
            next();
        };
    }
}

export default new EndpointSchema().schema;