import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from '@columns/entities';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
