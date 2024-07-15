import { CardPriority } from '@cards/models';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCardDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  @MinLength(2)
    name: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
    description: string | null;

  @IsDefined()
  @IsEnum(CardPriority)
    priority: CardPriority;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : null)
    deadline: Date | null;

  @IsDefined()
  @IsNumber()
    columnId: number;
}
