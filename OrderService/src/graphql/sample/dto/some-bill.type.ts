import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Local bills '})
export class SomeBillInputType {
  @Field(type => String, { description: 'Mã phiếu gửi'})
  BILL: string;

  @Field(type => Number, { description: 'Trạng thái: 0 = Thành công, 1 = Đồng bộ lỗi'})
  STATUS: number;

  @Field(type => Date, { nullable: true })
  DATE_CREATE?: Date;
}
