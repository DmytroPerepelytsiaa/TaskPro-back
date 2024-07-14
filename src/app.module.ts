import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { JWT_SECRET } from './common/constants/jwt';
import { DashboardEntity } from './dashboards/entities/dashboard.entity';
import { DashboardsModule } from './dashboards/dashboards.module';
import { ColumnsModule } from './columns/columns.module';
import { ColumnEntity } from './columns/entities/column.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminpassword',
      database: 'task-pro',
      entities: [UserEntity, DashboardEntity, ColumnEntity],
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    UsersModule,
    DashboardsModule,
    ColumnsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
