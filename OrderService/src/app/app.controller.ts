import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from "./app.service";

// @UseFilters(AllHttpExceptionFilter)
@Controller()
export class AppController {
  constructor(
      @Inject(AppService) private readonly appService : AppService) {}

  @Get('/')
  getHome(): string {
    return '🚀 Server ready. [/api-docs | /graphql]'
  }

}
