import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { DeleteResult } from 'typeorm';
import { DashboardsService } from './dashboards.service';
import { DashboardEntity } from './entities';
import { CreateDashboardDto } from './dto';
import { IsDashboardExistPipe, IsUserDashboardOwnerPipe } from './pipes';

@Controller('api/dashboards')
export class DashboardsController {
  constructor (
    private dashboardsService: DashboardsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getDashboards(@Req() req): Promise<DashboardEntity[]> {
    return this.dashboardsService.getDashboards(req.user.email);
  }
  
  @UseGuards(AuthGuard)
  @Post()
  createDashboard(@Body() body: CreateDashboardDto, @Req() req): Promise<DashboardEntity> {
    return this.dashboardsService.createDashboard(body, req.user.email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDashboard(@Body(IsDashboardExistPipe, IsUserDashboardOwnerPipe) body: DashboardEntity): Promise<DashboardEntity> {
    return this.dashboardsService.updateDashboard(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDashboard(@Param('id') id: number, @Req() req): Promise<DeleteResult> {
    return this.dashboardsService.deleteDashboard(id, req.user.email);
  }
}
