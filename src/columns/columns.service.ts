import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardEntity } from '@dashboards/entities';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto';
import { ColumnEntity } from './entities';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity) private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(DashboardEntity) private dashboardRepository: Repository<DashboardEntity>,
  ) {}

  async createColumn(body: CreateColumnDto): Promise<ColumnEntity> {
    const dashboard = await this.dashboardRepository.findOneBy({ id: body.dashboardId });

    return this.columnRepository.save({ name: body.name, dashboard });
  }
}
