import { Controller, Get, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';

import { OrderEvent } from './order/order.events';
import Message from './message.event';

@Controller()
export class CqrsController {
  constructor(
      @Inject(ClientProxy) private readonly client: ClientProxy,
      private readonly eventBus: EventBus,
      private queryBus: QueryBus,
     ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get('/cqrs')
  cqrs() {
    this.client.emit<any>('message_printed', new Message('A message from other server'));
    return { message: 'A message sent to worker' };
  }

  @Get('/bid')
  async bid(): Promise<object> {
    const orderTransactionGUID = uuid.v4();
    // We are hard-coding values here
    // instead of collecting them from a request
    this.eventBus.publish(
    new OrderEvent(
    orderTransactionGUID, 'bannv', 'Samsung LED TV',    50000));
    return { status: 'PENDING', time: Date.now() };
  }

 }
