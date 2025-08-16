
import { Controller, Post, Body, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { plainToInstance } from 'class-transformer';

import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UpdateUserGeneralInfoDto } from './dto';
import { IsUserExistPipe, ValidateLoginPayloadPipe } from './pipes';
import { UserEntity } from './entities';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
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
  getCurrentUser(@Req() req): UserEntity {
    const email = req.user.email;
    const user = this.usersService.getUserByEmail(email);
    return plainToInstance(UserEntity, user);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateCurrentUser(@Req() req, @Body() body: UpdateUserGeneralInfoDto): Promise<UserEntity> {
    const email = req.user.email;
    await this.usersService.updateUserGeneralInfo(email, body);
    const user = this.usersService.getUserByEmail(email);
    return plainToInstance(UserEntity, user);
  }
}
