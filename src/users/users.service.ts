import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  createUser(body: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save({ ...body });
  }
}
