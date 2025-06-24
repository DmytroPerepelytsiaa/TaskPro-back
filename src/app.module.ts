import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [UserEntity, DashboardEntity, ColumnEntity, CardEntity],
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    UsersModule,
    DashboardsModule,
    ColumnsModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASS);
    console.log(process.env.DB_NAME);
    console.log(process.env.JWT_SECRET);
    console.log(process.env.JWT_EXPIRES_IN);
  }
}
