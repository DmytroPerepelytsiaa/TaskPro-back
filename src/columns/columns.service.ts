import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardEntity } from '@dashboards/entities';
import { DeleteResult, Repository } from 'typeorm';

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

  async updateColumn(name: string, id: number, email: string): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({ where: { id }, relations: ['dashboard'] });

    if (!column) {
      throw new NotFoundException();
    }
    
    if (email !== column.dashboard.ownerEmail) {
      throw new ForbiddenException();
    }

    column.name = name;
    return this.columnRepository.save(column);
  }
  async deleteColumn(id: number, email: string): Promise<DeleteResult> {
    const column = await this.columnRepository.findOne({ where: { id }, relations: ['dashboard'] });

    if (!column) {
      throw new NotFoundException();
    }
    
    if (email !== column.dashboard.ownerEmail) {
      throw new ForbiddenException();
    }

    return this.columnRepository.delete(id);
  }
}
