import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { DashboardsService } from './dashboards.service';
import { DashboardEntity } from './entities/dashboard.entity';
import { IsDashboardExistPipe } from './pipes/is-dashboard-exist.pipe';

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
  @Patch(':id')
  updateDashboard(@Body(IsDashboardExistPipe) body: DashboardEntity): Promise<DashboardEntity> {
    return this.dashboardsService.updateDashboard(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDashboard(@Param('id') id: number): Promise<DeleteResult> {
    return this.dashboardsService.deleteDashboard(id);
  }
}
