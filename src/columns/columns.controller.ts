import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { DeleteResult } from 'typeorm';
import { CreateColumnDto } from './dto';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './entities';
import { IsDashboardExistAndMatchOwner } from './pipes';

@Controller('api/columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createColumn(@Body(IsDashboardExistAndMatchOwner) body: CreateColumnDto): Promise<ColumnEntity> {
    return this.columnsService.createColumn(body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteColumn(@Param('id') id: number, @Req() req): Promise<DeleteResult> {
    return this.columnsService.deleteColumn(id, req.user.email);
  }
}
