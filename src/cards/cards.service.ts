import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from '@columns/entities';
import { Repository } from 'typeorm';
import { CardEntity } from './entities';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity) private cardRepository: Repository<CardEntity>,
    @InjectRepository(ColumnEntity) private columnRepository: Repository<ColumnEntity>,
  ) {}

  async createCard(body: CreateCardDto, email: string): Promise<CardEntity> {
    const column = await this.columnRepository.findOne({ where: { id: body.columnId }, relations: ['dashboard'] });

    if (!column) {
      throw new NotFoundException();
    }

    if (column.dashboard.ownerEmail !== email) {
      throw new ForbiddenException();
    }

    delete body.columnId;
    return this.cardRepository.save({ ...body, column });
  }
}
