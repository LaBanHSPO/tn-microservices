import { Field, ID, ObjectType } from 'type-graphql';
import { BillType } from './bill.type'
import { SomeBillType } from './some.bill.type'

@ObjectType()
export default class Samples {
    @Field(type => ID)
    ID_SAMPLE: number;

    @Field(type => [BillType])
    BILLS: BillType[];

    @Field(type => [SomeBillType])
    SOME_BILLS: SomeBillType[];

    @Field(type => [Date])
    SENSOR_COUNTS: Date[];

    @Field(type => String, { nullable: true, description: 'Trạng thái: OK = Thành công'})
    STATUS?: string;

    @Field(returns => Date, { nullable: true })
    TIME_START?: Date;

    @Field(returns => Date, { nullable: true })
    TIME_END?: Date;
}
