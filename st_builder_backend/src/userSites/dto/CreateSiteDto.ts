import { IsString, IsOptional } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  site_name: string;

  @IsString()
  @IsOptional()
  site_address: string | null;
}