import { IsNotEmpty } from 'class-validator';

export class NewWorkLogDto {
  @IsNotEmpty()
  permit_number: string;

  @IsNotEmpty()
  planned_start_time: string;

  @IsNotEmpty()
  planned_end_time: string;
}
