import { IsNotEmpty } from 'class-validator';

export class UpdatePermitDto {
  @IsNotEmpty()
  permit_number: string;

  @IsNotEmpty()
  vendor: string;

  // on point update log id
  @IsNotEmpty()
  id: string;

  // not sure what this is yet
  // @IsNotEmpty()
  version: number;

  // not sure if we need this.
  @IsNotEmpty()
  client: string;

  @IsNotEmpty()
  status: string;

  // @IsNotEmpty()
  street_lane: string;

  // @IsNotEmpty()
  bike_lane: string;

  // @IsNotEmpty()
  traffic_light: string;

  // @IsNotEmpty()
  bus_stop_impact: string;

  @IsNotEmpty()
  setup_by: string;

  torn_down_at: string;

  image_url: string;

  @IsNotEmpty()
  lat_app: string;

  @IsNotEmpty()
  long_app: string;

  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  username: string;
}
