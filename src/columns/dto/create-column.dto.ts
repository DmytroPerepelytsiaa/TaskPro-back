import { IsDefined, IsNumber, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @IsDefined()
  @MaxLength(72)
    name: string;

  @IsDefined()
  @IsNumber()
    dashboardId: number;
}
