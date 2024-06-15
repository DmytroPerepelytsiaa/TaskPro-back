import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { DashboardsService } from './dashboards.service';
import { DashboardEntity } from './entities/dashboard.entity';
import { DeleteResult } from 'typeorm';

@Controller('dashboards')
export class DashboardsController {
  constructor (
    private readonly dashboardsService: DashboardsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getDashboards(): Promise<DashboardEntity[]> {
    return this.dashboardsService.getDashboards();
  }
  
  @UseGuards(AuthGuard)
  @Post()
  createDashboard(@Body() body: CreateDashboardDto): Promise<DashboardEntity> {
    return this.dashboardsService.createDashboard(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDashboard(@Param('id') id: number): Promise<DeleteResult> {
    return this.dashboardsService.deleteDashboard(id);
  }
}
