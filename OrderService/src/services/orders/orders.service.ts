import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { RabbitMQ } from '../../queue-cache/rabbitmq.queue';
import { Orders, CreateOrdersPayload } from './orders.schema';

const convertCallbackToPromiseJS = (redisClient, productId) => new Promise((resolve, reject) => {
  redisClient.hget('quantity_on_hand', productId, (err, value) => {
    console.log('value, error', value, err);
    if (err) return reject(err);
    resolve(value);
  });
});

const convertHsetToPromise = (redisClient, hkey, key, value) => new Promise((resolve, reject) => {
  redisClient.hset(hkey, key, value, (err) => {
    if (err) return reject(err);
    resolve();
  });
});

@Injectable()
export class OrdersService {

  constructor(
    @Inject(RabbitMQ) private rabbitMQ: RabbitMQ,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) { }
  async checkOrdersStatus(payload: CreateOrdersPayload): Promise<any> {
    const redisClient = this.cacheManager.store.getClient();
    let orders = [];
    for (const order of payload.orderList) {
      let status = 'MISSING'; // thieu hang trong kho
      // kiem tra san pham don hang voi so luong ton kho hien tai (co the xuat)
      // call redis check ton kho co the xuat
      const currentValueInRedis = await convertCallbackToPromiseJS(redisClient, order.PRODUCT_ID);
      redisClient.incrby('user:100:counter', 0, (err, v) => {
        console.log('---->', err, v, typeof v, typeof 5);
      })
      if (!currentValueInRedis || Number(currentValueInRedis) - order.QUANTITY < 0) {
        orders.push({
          ORDER_ID: order.ORDER_ID,
          STATUS: 'MISSING' // thieu hang trong kho
        });
      } else {
        orders.push({
          ORDER_ID: order.ORDER_ID,
          STATUS: 'READY' // sang hang trong kho
        });
        // using: INCRBY, DECR and DECRBY.
        await convertHsetToPromise(redisClient, 'quantity_on_hand', order.PRODUCT_ID, Number(currentValueInRedis) - order.QUANTITY);
      }
    }
    this.rabbitMQ.enqueueNewOrders(payload);
    return {
      status: 'OK',
      orders
    }
  }
}