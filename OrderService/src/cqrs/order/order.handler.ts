import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { OrderCommand } from './order.command';
import { ItemRepository } from 'src/cqrs/item/item.repository';

const delaySeconds = (): Promise<any> => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 5000);
})

@CommandHandler(OrderCommand)
export class OrderHandler implements ICommandHandler<OrderCommand> {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly publisher: EventPublisher) {}

  async execute(command: OrderCommand) {

    const { orderTransactionGUID , orderAmount, orderItem, orderUserGUID } = command;
    await delaySeconds();
    // tslint:disable-next-line:no-console
    console.log(`[${Date.now()}] Make a bid on ${orderItem}, with userID: ${orderUserGUID} amount: ${orderAmount}`);

    // to associate model ( Order ) and publisher, we use code bellow
    const item = this.publisher.mergeObjectContext(
      await this.itemRepository.getItemById(orderItem),
    );

    item.orderOnItem(orderTransactionGUID, orderUserGUID, orderAmount);
    if (Math.random() > Math.random()) {
      item.commit();
      console.log('Commited');
    } else {
      item.uncommit();
      console.log('Uncommited');
    }
  }

}