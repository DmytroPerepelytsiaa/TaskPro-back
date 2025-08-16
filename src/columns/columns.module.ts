import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardEntity } from '@dashboards/entities';

import { ColumnEntity } from './entities';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, DashboardEntity])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
