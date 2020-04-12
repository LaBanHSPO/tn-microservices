import { ApiProperty } from '@nestjs/swagger';

export class Animal {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  info?: object;

}

export class QueryAllSchema {
@ApiProperty()
  name: string
}