import { Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ValidateLoginPayloadPipe implements PipeTransform {
  constructor (@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async transform(body: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (!user) {
      throw new UnauthorizedException('Email or password not valid');
    }

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Email or password not valid');
    }

    return body;
  }
}
