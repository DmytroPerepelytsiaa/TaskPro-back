import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  createDashboard(body: CreateDashboardDto): Promise<DashboardEntity> {
    return this.dashboardRepository.save(body);
  }
}
