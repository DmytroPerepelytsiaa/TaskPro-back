import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardEntity } from '../entities/dashboard.entity';

@Injectable()
export class IsDashboardExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(DashboardEntity)
    private dashboardRepository: Repository<DashboardEntity>
  ) {}

  async transform(body: DashboardEntity) {
    const dashboard = await this.dashboardRepository.findOneBy({ id: body.id });

    if (!dashboard) {
      throw new NotFoundException();
    }

    return body;
  }
}
