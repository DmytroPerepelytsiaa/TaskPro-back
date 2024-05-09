import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    body.password = await bcrypt.hash(body.password, 10);
    return this.userRepository.save({ ...body });
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  generateToken(email: string): Promise<string> {
    return this.jwtService.signAsync({ email });
  }
}
