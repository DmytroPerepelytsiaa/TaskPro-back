import { ForbiddenException, Injectable } from '@nestjs/common';
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

  getDashboards(email: string): Promise<DashboardEntity[]> {
    return this.dashboardRepository.find({ where: { ownerEmail: email } });
  }

  async updateDashboard(body: DashboardEntity): Promise<DashboardEntity> {
    const dashboard = await this.dashboardRepository.findOneBy({ id: body.id });
    
    Object.assign(dashboard, body);
    return this.dashboardRepository.save(dashboard);
  }

  createDashboard(body: CreateDashboardDto, email: string): Promise<DashboardEntity> {
    return this.dashboardRepository.save({ ...body, ownerEmail: email });
  }

  async deleteDashboard(id: number, email: string): Promise<DeleteResult> {
    const dashboard = await this.dashboardRepository.findOneBy({ id });

    if (dashboard.ownerEmail !== email) {
      throw new ForbiddenException();
    }

    return this.dashboardRepository.delete(id);
  }
}
