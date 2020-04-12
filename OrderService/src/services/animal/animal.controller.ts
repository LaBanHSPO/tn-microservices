import {
  Inject,
  Controller,
  Get,
  UseInterceptors,
  CacheKey,
  CacheTTL, Query, Post, CACHE_MANAGER, Delete,
  CacheInterceptor,
} from '@nestjs/common';
import { Animal, QueryAllSchema } from './animal.schema';
import {TransformInterceptor} from "./transform.interceptor";
import { AnimalService } from "./animal.service";
import {CacheInterceptor as CustomCacheInterceptor} from "./cache.interceptor";

@Controller()
@UseInterceptors(TransformInterceptor)
export default class AnimalController {
  constructor(
      @Inject(CACHE_MANAGER) private cacheManager,
      @Inject(AnimalService) private animalService: AnimalService
  ) {}

  @Get('/animals')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('get_animals')
  @CacheTTL(60)
  findAll(@Query() query: QueryAllSchema): Animal[] {
    return [{ id: 1, name: 'Cat3', info: query }];
  }

  @UseInterceptors(CustomCacheInterceptor)
  @Post('/animals')
  async createAnimal(): Promise<Animal> {
    const result = await this.animalService.createAnimal();
    return result;
  }

    @Delete('animals/reset-cache')
    resetCache() {
        this.cacheManager.del('/animals', () => console.log('Clear cache on /animals DONE'));
    }

}
