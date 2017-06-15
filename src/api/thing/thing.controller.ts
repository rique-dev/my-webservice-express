import Controller from '../../components/endpoint/Controller';
import ThingDao from './base/thing.dao';
import DocumentDao from '../../components/endpoint/Dao';

export class ThingController extends Controller { }

export default new ThingController(ThingDao);
