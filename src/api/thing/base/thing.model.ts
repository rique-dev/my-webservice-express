import { Model, Document } from 'mongoose';
import EntityModel from '../../../components/endpoint/Model';

export class ThingModel extends EntityModel { }

export default new ThingModel('Thing').model;
