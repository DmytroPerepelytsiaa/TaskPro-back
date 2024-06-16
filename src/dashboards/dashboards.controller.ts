import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { DashboardsService } from './dashboards.service';
import { DashboardEntity } from './entities/dashboard.entity';
import { IsDashboardExistPipe } from './pipes/is-dashboard-exist.pipe';
import { UserIsNotOwnerPipe } from './pipes/user-is-not-owner.pipe';

@Controller('dashboards')
export class DashboardsController {
  constructor (
    private readonly dashboardsService: DashboardsService,
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
  updateDashboard(@Body(IsDashboardExistPipe, UserIsNotOwnerPipe) body: DashboardEntity): Promise<DashboardEntity> {
    return this.dashboardsService.updateDashboard(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDashboard(@Param('id') id: number, @Req() req): Promise<DeleteResult> {
    return this.dashboardsService.deleteDashboard(id, req.user.email);
  }
}
