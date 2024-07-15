import { AuthGuard } from '@common/guards';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
