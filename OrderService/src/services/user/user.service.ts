import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) { }


  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userCounts = await this.userRepository.count({ $or: [
        { username: user.username },
        { phone: user.phone }
      ]});
      if (userCounts > 0) {
        throw new BadRequestException('EXISTED_USER_INFORMATION');
      }
      return this.userRepository.createUser(user);
  }

  async findOne(options): Promise<UserEntity> {
    return this.userRepository.findOne(options);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}