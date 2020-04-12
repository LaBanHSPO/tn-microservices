import { EntityRepository, MongoRepository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import {UserEntity} from './user.entity';
import { CreateUserPayload } from './user.schema';

@EntityRepository(UserEntity)
export class UserRepository extends MongoRepository<UserEntity> {
  constructor() {
    super();
  }

  findOne = async (options) => {
    return this.findOneOrFail(options, { select: [
      'id', 'full_name', 'phone', 'avatar', 'username'
    ] })
  }
  createUser = async (payload: CreateUserPayload) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashSaltPassword = bcryptjs.hashSync(payload.password, salt);
    return await this.save({ ...payload, password: hashSaltPassword });
  };
}
