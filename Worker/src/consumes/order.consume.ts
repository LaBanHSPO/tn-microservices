import { Inject, Injectable, CACHE_MANAGER, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const amqp = require('amqplib/callback_api');

enum QueueName {
  ORDERS = 'ORDERS'
}

@UseInterceptors(CacheInterceptor)
@Injectable()
export class OrderConsume {
  constructor(
  @Inject(ConfigService) private readonly configService: ConfigService,
  @Inject(CACHE_MANAGER) private cacheManager,
  ) {
    const config = this.configService.get('queueConfig');
    amqp.connect(config.rabbitmq, (err, conn) => {
      if (err) {
        console.error(err);
        throw Error('RabbitMQ error connect');
      }
      conn.createChannel((err, channel) => {
        if (!err) {
          console.log('RabbitMQ ready!');
          this.registerConsumnes(channel)
        }
      });
    });
  }

  registerConsumnes(channel) {
    channel.assertQueue(QueueName.ORDERS, {
        durable: false
      });
      console.log(' [*] Waiting for messages in %s...', QueueName.ORDERS);
    /**
     * Xử lý các đơn hàng mới đến
    */
   channel.consume(QueueName.ORDERS, async (msg) => {
    const content = JSON.parse(msg.content.toString());
    console.log('Received message: %o', content);
    this.cacheManager.get('k1', (err, value) => {
      if (err) throw err;
      console.log('k1', value)
    });
   })
  }
}
