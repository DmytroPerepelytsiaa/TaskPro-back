import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@common/constants';
import { UserEntity } from '@users/entities';
import { UsersModule } from '@users/users.module';
import { DashboardEntity } from '@dashboards/entities';
import { DashboardsModule } from '@dashboards/dashboards.module';
import { ColumnEntity } from '@columns/entities';
import { ColumnsModule } from '@columns/columns.module';
import { CardsModule } from '@cards/cards.module';
import { CardEntity } from '@cards/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminpassword',
      database: 'task-pro',
      entities: [UserEntity, DashboardEntity, ColumnEntity, CardEntity],
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
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
