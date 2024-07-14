
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { IsUserExistPipe, ValidateLoginPayloadPipe } from './pipes';
import { UserEntity } from './entities';

@Controller('api/users')
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
