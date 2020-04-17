import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Celery } from '../../queue-cache/celery.client';
import { CreateOrdersPayload } from './orders.schema';


@Injectable()
export class OrdersService {

  constructor(
    @Inject(Celery) private celery,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) { }
  async checkOrdersStatus(payload: CreateOrdersPayload): Promise<any> {
    const redisClient = this.cacheManager.store.getClient();
    let orders = [];
    for (const order of payload.orderList) {
      const orderQuantity = Number(order.QUANTITY);
      // kiem tra san pham don hang voi so luong ton kho hien tai (co the xuat)
      // call redis check ton kho co the xuat
      const qty = await new Promise((resolve, reject) => redisClient.hincrby('quantity_on_hand', order.PRODUCT_ID, 0, (err, v) => {
        if (err) return reject(err);
        resolve(v);
      }));
      if (Number(qty) - orderQuantity < 0) {
        orders.push({
          ORDER_ID: order.ORDER_ID,
          STATUS: 'MISSING' // thieu hang trong kho
        });
      } else {
        orders.push({
          ORDER_ID: order.ORDER_ID,
          STATUS: 'READY' // sang hang trong kho
        });
        await new Promise((resolve, reject) => redisClient.hincrby('quantity_on_hand', order.PRODUCT_ID, orderQuantity * -1, (err) => {
          if (err) return reject(err);
          resolve();
        }));
      }
    }
    this.celery.run('tasks.echo', ['Hello World1!']).then(result => console.info(result));
    this.celery.run('tasks.echo', ['Hello World2!']).then(result => console.info(result));
    return {
      status: 'OK',
      orders
    }
  }
}