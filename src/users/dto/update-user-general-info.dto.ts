import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserGeneralInfoDto {
  @IsOptional()
  @IsString()
  @Length(2, 32)
    name: string;

  @IsOptional()
  @IsString()
    avatarUrl: string;
}
