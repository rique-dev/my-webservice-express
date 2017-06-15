import { ThingDocument, Thing } from './thing';
import { Model, Document, Types } from 'mongoose';
import ThingModel from './thing.model';
import DocumentDao from '../../../components/endpoint/Dao';

export class ThingDao extends DocumentDao { }

export default new ThingDao(ThingModel);
