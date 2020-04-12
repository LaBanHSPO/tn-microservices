import { Injectable } from '@nestjs/common';
import { FiltersSample } from './dto/filter-sample';
import Sample from './models/sample';

@Injectable()
export class SampleService {

    async listSample(filter: FiltersSample): Promise<Sample[]> {
        try {
            // const fromDate = new Date(filter.FROM_DATE).toISOString();
            // const toDate = new Date(filter.TO_DATE).toISOString();
            return [] as Sample[];
        } catch (error) {
            throw error;
        }
    }
}
