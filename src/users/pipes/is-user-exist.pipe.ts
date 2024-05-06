import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class IsUserExistPipe implements PipeTransform {
  constructor (@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async transform(body: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (user) {
      throw new ConflictException('User with this email already exist');
    }

    return body;
  }
}
