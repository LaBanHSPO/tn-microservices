import {Inject, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const celery = require('node-celery');

@Injectable()
export class Celery {
  client: any;
  constructor(
  @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const config = this.configService.get('queueConfig');
    const client = celery.createClient({
      CELERY_BROKER_URL: config.brokerUrl,
      CELERY_RESULT_BACKEND: config.result_backend,
      IGNORE_RESULT: false
    });
    client.on('connect', function() {
      console.info('Celery connect!');
    });
    client.on('error', function(err) {
      console.log(err);
    });
   this.client = client;
  }

  async run(task, data) {
    return new Promise((resolve) => {
      this.client.call(task, data, (result) => {
        console.log('Result');
        console.log(result);
        this.client.client.end();
        resolve(result);
      })
  })
  }
}
