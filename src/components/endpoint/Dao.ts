import { Model, Document, Types, SchemaDefinition } from 'mongoose';
import { Entity } from './endpoint';

export default class DocumentDao {
    constructor(public documentModel: Model<Document>) { }

    public async list(): Promise<Document[]> {
        let documents: Document[];

        try {
            documents = await this.documentModel.find().exec();
            if (!documents) {
                documents = undefined;
            }
        } catch (err) {
            throw err;
        }

        return Promise.resolve(documents);
    }

    public async create(data: Entity): Promise<Document> {
        let document: Document;

        try {
            document = await this.documentModel.create(data);
        } catch (err) {
            throw err;
        }

        return Promise.resolve(document);
    }

    public async read(id: Types.ObjectId): Promise<Document> {
        let document: Document;

        try {
            document = await this.documentModel.findById(id).exec();
            if (!document) {
                document = undefined;
            }
        } catch (err) {
            throw err;
        }

        return Promise.resolve(document);
    }

    public async update(id: Types.ObjectId, data: any): Promise<Document> {
        let document: Document;
        const query = { _id: id };
        const options: Object = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: true
        };

        try {
            document = await this.documentModel
                .findOneAndUpdate(query, data, options)
                .exec();
            if (!document) {
                document = undefined;
            }
        } catch (err) {
            throw err;
        }

        return Promise.resolve(document);
    }

    public async destroy(id: Types.ObjectId): Promise<Document> {
        let document: Document;

        try {
            document = await this.read(id);
            if (document) {
                document = await document.remove();
            }
        } catch (err) {
            throw err;
        }

        return document;
    }
}
