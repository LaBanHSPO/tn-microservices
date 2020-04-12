import { Module } from '@nestjs/common';
import { SampleResolver } from './sample.resolver';
import { SampleWsResolver } from './sample.ws.resolver';
import { SampleService } from './sample.service';
import { DateScalar } from '../scalars/date.scalar';

@Module({
    providers: [
        SampleResolver,
        SampleWsResolver,
        SampleService,
        DateScalar
    ],
})
export class SamplesModule {}
