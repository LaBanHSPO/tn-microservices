import { ApiProperty } from '@nestjs/swagger';

export class Orders {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  info?: object;

}

export class QueryAllSchema {
@ApiProperty()
  name: string
}


export class Order {
  @ApiProperty()
  ORDER_ID: number;
  
  @ApiProperty()
  PRODUCT_ID: number;

  @ApiProperty()
  QUANTITY: number;
}

export class CreateOrdersPayload {
  @ApiProperty()
  orderList: Order[]
}