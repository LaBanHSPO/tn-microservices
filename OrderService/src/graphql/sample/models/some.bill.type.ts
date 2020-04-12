import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SomeBillType {
  @Field(type => String)
  BILL: string;

  @Field(type => Date, { nullable: true })
  DATE_CREATE?: Date;

  @Field(type => Number, { description: 'Trạng thái: 0 = Thành công, 1 = Đồng bộ lỗi'})
  STATUS: number;
}
