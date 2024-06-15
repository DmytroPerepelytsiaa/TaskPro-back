import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { DashboardEntity } from './entities/dashboard.entity';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(DashboardEntity)
    private dashboardRepository: Repository<DashboardEntity>
  ) {}

  getDashboards(): Promise<DashboardEntity[]> {
    return this.dashboardRepository.find();
  }

  async updateDashboard(body: DashboardEntity): Promise<DashboardEntity> {
    const dashboard = await this.dashboardRepository.findOneBy({ id: body.id });
    
    Object.assign(dashboard, body);
    return this.dashboardRepository.save(dashboard);
  }

  createDashboard(body: CreateDashboardDto): Promise<DashboardEntity> {
    return this.dashboardRepository.save(body);
  }

  deleteDashboard(id: number): Promise<DeleteResult> {
    return this.dashboardRepository.delete(id);
  }
}
