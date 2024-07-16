import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { DashboardEntity } from '@dashboards/entities';
import { CreateColumnDto } from '@columns/dto';
import { Repository } from 'typeorm';

@Injectable()
export class IsDashboardExistAndMatchOwner implements PipeTransform {
  constructor(
    @InjectRepository(DashboardEntity)
    private dashboardRepository: Repository<DashboardEntity>,
    @Inject(REQUEST) private req
  ) {}

  async transform(body: CreateColumnDto) {
    const dashboard = await this.dashboardRepository.findOneBy({
      id: body.dashboardId,
    });

    if (!dashboard) {
      throw new NotFoundException();
    }

    const email = this.req.user.email;
    
    if (email !== dashboard.ownerEmail) {
      throw new ForbiddenException();
    }

    if (dashboard) {
      return body;
    }
  }
}
