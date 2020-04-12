import { Field, InputType } from 'type-graphql';

@InputType()
export class BillInputType {
  @Field(type => String)
  BILL: string;

  @Field(type => String, { nullable: true })
  DATE_CREATE?: string | number;
}
