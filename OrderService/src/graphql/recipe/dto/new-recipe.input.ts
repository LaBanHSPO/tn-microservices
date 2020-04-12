import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Desc' })
export class NewRecipeInput {
    @Field()
    id: number

    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field(type => [String])
    ingredients: string[];
}
