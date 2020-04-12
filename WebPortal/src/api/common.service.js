import SERVICES from '../config/service.names';
import { CollectionService } from './base.service';

class Service extends CollectionService {
  constructor() {
    super(SERVICES.COMMON);
  }

  fetchTodo = (params) =>
    this.fakeApi({}, { data: [{ id: 1, text: 'Todo 01' }] });
}

export default new Service();
