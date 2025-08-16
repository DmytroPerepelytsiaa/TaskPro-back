import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from '@columns/entities';
import { DeleteResult, Repository } from 'typeorm';

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

  async updateCard(body: CreateCardDto, id: number, email: string): Promise<CardEntity> {
    const column = await this.columnRepository.findOne({ where: { id: body.columnId }, relations: ['dashboard'] });
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!column || !card) {
      throw new NotFoundException();
    }

    if (column.dashboard.ownerEmail !== email) {
      throw new ForbiddenException();
    }

    card.name = body.name;
    card.description = body.description;
    card.priority = body.priority;
    card.deadline = body.deadline;

    return this.cardRepository.save({ ...card, column });
  }

  async deleteCard(id: number, email: string): Promise<DeleteResult> {
    const card = await this.cardRepository.findOne({ where: { id }, relations: ['column', 'column.dashboard'] });

    if (!card) {
      throw new NotFoundException();
    }

    if (card.column.dashboard.ownerEmail !== email) {
      throw new ForbiddenException();
    }

    return this.cardRepository.delete(id);
  }
}
