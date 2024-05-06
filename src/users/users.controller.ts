import { Controller, Post, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsUserExistPipe } from './pipes/is-user-exist.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidateLoginPayloadPipe } from './pipes/validate-login-payload.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async create(@Body(IsUserExistPipe) body: CreateUserDto): Promise<{ token: string }> {
    body.password = await bcrypt.hash(body.password, 10);
    const token = await this.jwtService.signAsync({ email: body.email });
    await this.usersService.createUser(body);
    return { token };
  }

  @Post('login')
  async login(@Body(ValidateLoginPayloadPipe) body: LoginUserDto): Promise<{ token: string }> {
    const token = await this.jwtService.signAsync({ email: body.email });
    return { token };
  }
}
