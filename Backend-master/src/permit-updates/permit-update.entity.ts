import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class PermitUpdate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // this is the data from On - Point
  @Column({ nullable: true })
  permit_number: string;

  @Column({ nullable: true })
  vendor: string;

  @Column({ nullable: true })
  version: number;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  timestamp: string;

  // id of the event (possibly for reference when a new update comes in with the same id)
  @Column({ nullable: true })
  on_point_id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  street_lanes: string;

  @Column({ nullable: true })
  bike_lanes: string;

  // traffic signal
  @Column({ nullable: true })
  signal_impacted: string;

  // bus stop
  @Column({ nullable: true })
  transit_impacted: string;

  @Column({ nullable: true })
  setup_by: string;

  // filled out when torn down
  @Column({ nullable: true, type: 'timestamp' })
  torn_down_at: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  gps_lat: string;

  @Column({ nullable: true })
  gps_long: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  work_log_id: number;
}
