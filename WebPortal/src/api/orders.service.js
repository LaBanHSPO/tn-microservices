import SERVICES from '../config/service.names';
import { CollectionService } from './base.service';

class Service extends CollectionService {
  constructor() {
    super(SERVICES.ORDERS);
  }
}

export default new Service();
