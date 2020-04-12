import {Inject, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const amqp = require('amqplib/callback_api');

enum QueueName {
  ORDERS = 'ORDERS'
}

@Injectable()
export class RabbitMQ {
  channel: any;
  constructor(
  @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const config = this.configService.get('queueConfig');
    amqp.connect(config.rabbitmq, (err, conn) => {
      if (err) {
        console.error(err);
        throw Error('RabbitMQ error connect');
      }
      conn.createChannel((err, channel) => {
        if (!err) {
          this.channel = channel;
          console.log(' RabbitMQ ready!');
        }
      });
    });
  }

  async enqueueNewOrders(message_data): Promise<void> {
    if (!this.channel) {
      throw Error('ERR. Channel is not registered.');
    }
    const msg = JSON.stringify(message_data);
    this.channel.sendToQueue(QueueName.ORDERS, Buffer.from(msg));
  }
}
