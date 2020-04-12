import { IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { BillInputType } from './bill.type'
import { SomeBillInputType } from './some-bill.type'

@InputType({  description: "Desc..." })
export class NewSampleInput {
    @Field({  description: "Mã" })
    ID_SAMPLE: number;

    @Field(type => [BillInputType])
    BILLS: BillInputType[];

    @Field(type => [SomeBillInputType])
    SOME_BILLS: SomeBillInputType[];

    @Field((type => [Date]))
    SENSOR_COUNTS: Date[];

    @Field(type => Date, { nullable: true })
    TIME_END?: Date;

    @Field(type => Date, { nullable: true })
    TIME_START?: Date;

    @Field({ nullable: true })
    @IsOptional()
    STATUS?: string;

    @Field({ nullable: true })
    @IsOptional()
    NOTES: string;
}
