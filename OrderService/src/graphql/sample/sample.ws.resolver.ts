import { Resolver, Subscription } from '@nestjs/graphql';
import Sample from './models/sample';
import { SampleService } from './sample.service';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
import pubSub from '../pubSub';

@Resolver(of => Sample)
export class SampleWsResolver {
    constructor(private readonly chuteService: SampleService) {}

    @Subscription(returns => Sample, {
    })
    addedSample() {
        return pubSub.asyncIterator('addedSample');
    }

}
