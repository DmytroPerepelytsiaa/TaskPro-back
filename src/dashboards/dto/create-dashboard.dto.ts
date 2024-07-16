import { DashboardBackgrounds, DashboardIcons } from '@dashboards/models';
import { IsDefined, IsEnum, MaxLength } from 'class-validator';

export class CreateDashboardDto {
  @IsDefined()
  @MaxLength(64)
    name: string;

  @IsDefined()
  @IsEnum(DashboardIcons)
    icon: DashboardIcons;

  @IsDefined()
  @IsEnum(DashboardBackgrounds)
    background: DashboardBackgrounds;
}
