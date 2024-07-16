import { Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@users/entities';
import { CreateUserDto } from '@users/dto';

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
