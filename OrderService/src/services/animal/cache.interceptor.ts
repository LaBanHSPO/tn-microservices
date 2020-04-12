import {Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, CACHE_MANAGER} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const client = this.cacheManager.store.getClient();
        this.cacheManager.get('cached_animal_key', (error, value) => {
            console.log(' -> ', value)
        })
        return new Promise(resolve => {
            client.get('cached_animal_key', (err, value) => {
                if (value) {
                    resolve(of([{
                        fromCache: value
                    }]));
                } else {
                  resolve(next.handle())
                }
            })
        });
    }
}
