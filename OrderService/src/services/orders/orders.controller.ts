import {
  Inject,
  Controller,
  Body,
  Post, CACHE_MANAGER
} from '@nestjs/common';
import { Orders, CreateOrdersPayload } from './orders.schema';
import { OrdersService } from "./orders.service";

@Controller()
export default class OrdersController {
  constructor(
      @Inject(CACHE_MANAGER) private cacheManager,
      @Inject(OrdersService) private ordersService: OrdersService
  ) {}

  @Post('/orders')
  async createOrders(@Body() createOrdersPayload: CreateOrdersPayload): Promise<Orders> {
    const result = await this.ordersService.checkOrdersStatus(createOrdersPayload);
    return result;
  }
}
