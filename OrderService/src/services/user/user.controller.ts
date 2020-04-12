import {
  Controller, Post, Body,
  Get, Delete, Param, UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserPayload } from './user.schema';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@UseGuards(JwtAuthGuard)
@Controller()
export default class UserController {
  constructor(private usersService: UserService) { }

  @Post('users')
  create(@Body() createUserDto: CreateUserPayload): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
