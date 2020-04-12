import { UseGuards, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Sample from './models/sample';
import { NewSampleInput } from './dto/new-sample.input';
import { FiltersSample } from './dto/filter-sample';
import { SampleService } from './sample.service';
import { GqlAuthGuard } from '../../auth/guards/graphql.guard';
import pubSub from '../pubSub';

@UseGuards(GqlAuthGuard)
@Resolver(of => Sample)
export class SampleResolver {
    constructor(
        private readonly sampleService: SampleService
    ) {}

    @Query(returns => [Sample])
    async samples( @Args('filter') filter: FiltersSample): Promise<Sample[]> {
      const data = await this.sampleService.listSample(filter);
      if (!data) {
        throw new NotFoundException();
      }
      return data;
    }

  @Mutation(returns => Sample)
    async addSample(
        @Args('newSampleInput') newSampleInput: NewSampleInput,
    ): Promise<Sample> {
        pubSub.publish('addedSample', { addedSample: {} })
          .catch(err => {
            console.error('[PUBLISH_ERROR]', newSampleInput.ID_SAMPLE);
        });
        return;
    }
}
