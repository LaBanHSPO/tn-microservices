import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-fastify';
import { Recipe } from './models/recipe';
import { RecipesService } from './recipes.service';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
import pubSub from '../pubSub';

@Resolver(of => Recipe)
export class RecipesWsResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Subscription(returns => Recipe, {
        // filter: (payload, variables) =>
        //   payload.recipeAdded.title !== variables.title,
        // resolve: value => value,
    })
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}
