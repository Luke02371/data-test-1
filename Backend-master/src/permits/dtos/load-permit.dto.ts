import { IsNotEmpty } from 'class-validator';

export class LoadPermitDto {
  @IsNotEmpty()
  permit_number: string;

  @IsNotEmpty()
  issued_date: string;

  @IsNotEmpty()
  expiration_date: string;

  @IsNotEmpty()
  created_at: string;

  @IsNotEmpty()
  updated_at: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  owner: string;
}
