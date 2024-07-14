import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@users/dto';
import { UserEntity } from '@users/entities';
import { Repository } from 'typeorm';

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
