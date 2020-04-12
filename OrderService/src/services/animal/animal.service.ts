import { Injectable, Inject } from '@nestjs/common';
import { RabbitMQ } from '../../queue-cache/rabbitmq.queue';
import { Animal } from './animal.schema';

@Injectable()
export class AnimalService {

  constructor(
    @Inject(RabbitMQ) private rabbitMQ: RabbitMQ
  ) { }
  async createAnimal(): Promise<Animal> {
    this.rabbitMQ.enqueueNewOrders(
     {
       f: 1
     }
    );

    return {
      id: 1, name: 'Cat4',
    }
  }
}