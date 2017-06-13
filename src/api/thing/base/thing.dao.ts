import { ThingDocument, Thing } from './thing';
import { Model, Document, Types } from 'mongoose';
import ThingModel from './thing.model';

class ThingDao {

    constructor(public ThingModel: Model<Document>) { }

    public async list(): Promise<ThingDocument[]> {
        let Things: ThingDocument[];
        try {
            Things = <ThingDocument[]>await this.ThingModel.find().exec();
            if (!Things) {
                Things = undefined;
            }
        } catch (err) {
            throw err;
        }
        return Promise.resolve(Things);
    }

    public async create(thing: Thing): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = <ThingDocument>await this.ThingModel.create(thing);
        } catch (err) {
            throw err;
        }
        return Promise.resolve(Thing);
    }

    public async read(id: Types.ObjectId): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = <ThingDocument>await this.ThingModel.findById(id).exec();
            if (!Thing) {
                Thing = undefined;
            }
        } catch (err) {
            throw err;
        }
        return Promise.resolve(Thing);
    }

    public async update(id: Types.ObjectId, thing: Thing): Promise<ThingDocument> {
        let Thing: ThingDocument;
        const query = { _id: id };
        const options: Object = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: true
        };
        try {
            Thing = <ThingDocument>await this.ThingModel
                .findOneAndUpdate(query, thing, options)
                .exec();
            if (!Thing) {
                Thing = undefined;
            }
        } catch (err) {
            throw err;
        }
        return Promise.resolve(Thing);
    }

    public async destroy(id: Types.ObjectId): Promise<ThingDocument> {
        let Thing: ThingDocument;
        try {
            Thing = await this.read(id);
            if (Thing) {
                Thing = await Thing.remove();
            }
        } catch (err) {
            throw err;
        }
        return Thing;
    }
}

export default new ThingDao(ThingModel);
