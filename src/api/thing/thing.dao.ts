import { ThingDocument, Thing } from './base/thing';
import { Model, Document, Types } from 'mongoose';
import ThingModel from './base/thing.model';

class ThingDao {
    constructor(public Thing: Model<Document>) {

    }
    public async list(): Promise<ThingDocument[]> {
        let Things: ThingDocument[];
        try {
            Things = <ThingDocument[]>await this.Thing.find().exec();
            if (!Things) {
                Things = undefined;
            }
        } catch (error) {
            throw error;
        }
        return Promise.resolve(Things);
    }
    public async create(thing: Thing): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = <ThingDocument>await this.Thing.create(thing);
        } catch (err) {
            throw err;
        }
        return Promise.resolve(Thing);
    }
    public async read(id: Types.ObjectId): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = <ThingDocument>await this.Thing.findById(id).exec();
            if (!Thing) {
                Thing = undefined;
            }
        } catch (error) {
            throw new Error(error);
        }
        return Promise.resolve(Thing);
    }
    public async update(id: Types.ObjectId, thing: Thing): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = <ThingDocument>await this.Thing
                .findOneAndUpdate({
                    _id: id
                }, thing, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                    runValidators: true
                })
                .exec();
        } catch (error) {
            throw error;
        }
        return Promise.resolve(Thing);
    }
    public async destroy(id: Types.ObjectId): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = await this.read(id);
            if (Thing) {
                await Thing.remove();
            }
        } catch (error) {
            throw new Error(error);
        }
        return Thing;
    }
}

export default new ThingDao(ThingModel);
