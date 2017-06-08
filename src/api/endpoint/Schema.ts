import { Schema } from 'mongoose';

const schema = new Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date
});

// Methods

schema.pre('save', next => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

export default schema;