import { AuthGuard } from '@common/guards';
import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { CardEntity } from './entities';

@Controller('api/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createCard(@Body() body: CreateCardDto, @Req() req): Promise<CardEntity> {
    return this.cardsService.createCard(body, req.user.email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateCard(@Body() body: CreateCardDto, @Req() req, @Param('id') id: number): Promise<CardEntity> {
    return this.cardsService.updateCard(body, id, req.user.email);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCard(@Param('id') id: number, @Req() req): Promise<DeleteResult> {
    return this.cardsService.deleteCard(id, req.user.email);
  }
}
