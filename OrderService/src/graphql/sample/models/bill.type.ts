import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BillType {
  @Field(type => String)
  BILL: string;

  @Field(type => String)
  DATE_CREATE: string;
}
