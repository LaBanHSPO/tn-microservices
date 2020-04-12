import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPayload {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  isActive: boolean
}