import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipes.resolver';
import { RecipesWsResolver } from './recipes.ws.resolver';
import { RecipesService } from './recipes.service';

@Module({
    providers: [
      RecipesResolver,
        RecipesWsResolver,
        RecipesService
    ],
})
export class RecipesModule {}
