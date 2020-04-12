import { Field, InputType } from 'type-graphql';

@InputType({  description: "Desc..." })
export class FiltersSample {
    @Field({  description: "Mã", nullable: true })
    ID_SAMPLE?: number;

    @Field(type => Date, { nullable: true })
    FROM_DATE?: Date;

    @Field(type => Date, { nullable: true })
    TO_DATE?: Date;
}
