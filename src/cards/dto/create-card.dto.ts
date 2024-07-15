import { CardPriority } from '@cards/models';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCardDto {
  @IsDefined()
  @IsString()
  @Length(64)
  name: string;

  @IsOptional()
  @IsString()
  @Length(180)
  description: string | null;

  @IsDefined()
  @IsEnum(CardPriority)
  priority: CardPriority;

  @IsOptional()
  @IsDate()
  deadline: Date | null;

  @IsDefined()
  @IsNumber()
  columnId: number;
}
