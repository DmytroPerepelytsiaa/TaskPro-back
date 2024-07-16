import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardEntity } from '@dashboards/entities';
import { Repository } from 'typeorm';

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
