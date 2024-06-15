import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { JWT_SECRET } from './common/constants/jwt';
import { DashboardEntity } from './dashboards/entities/dashboard.entity';
import { DashboardsModule } from './dashboards/dashboards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminpassword',
      database: 'task-pro',
      entities: [UserEntity, DashboardEntity],
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    UsersModule,
    DashboardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
