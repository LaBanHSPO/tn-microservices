import { UseGuards, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';
import { RecipesService } from './recipes.service';
import { GqlAuthGuard } from '../../auth/guards/graphql.guard';
import pubSub from '../pubSub';

// @UseGuards(GqlAuthGuard)
@Resolver(of => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Query(returns => Recipe)
    async recipe(@Args('id') id: string): Promise<Recipe> {
        const recipe = await this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        return recipe;
    }

    @Query(returns => [Recipe])
    recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return this.recipesService.findAll(recipesArgs);
    }

    @Mutation(returns => Recipe)
    async addRecipe(
        @Args('newRecipeData') newRecipeData: NewRecipeInput,
    ): Promise<Recipe> {
        const recipe = await this.recipesService.create(newRecipeData);     
        pubSub.publish('recipeAdded', { recipeAdded: recipe });
        return recipe;
    }

    @Mutation(returns => Boolean)
    async removeRecipe(@Args('id') id: string) {
        return this.recipesService.remove(id);
    }
}