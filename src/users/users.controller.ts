
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsUserExistPipe } from './pipes/is-user-exist.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidateLoginPayloadPipe } from './pipes/validate-login-payload.pipe';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async create(@Body(IsUserExistPipe) body: CreateUserDto): Promise<{ token: string }> {
    await this.usersService.createUser(body);
    return { token: await this.usersService.generateToken(body.email) };
  }

  @Post('login')
  async login(@Body(ValidateLoginPayloadPipe) body: LoginUserDto): Promise<{ token: string }> {
    return { token: await this.usersService.generateToken(body.email) };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req): Promise<UserEntity> {
    const email = req.user.email;
    return this.usersService.getUserByEmail(email);
  }
}
