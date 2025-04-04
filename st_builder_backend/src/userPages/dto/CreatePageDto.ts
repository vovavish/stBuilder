import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  page_name: string;

  @IsString()
  page_slug: string;

  @IsString()
  page_data: string;
}