import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class WorkLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  permit_number: string;

  @Column({ nullable: true })
  planned_start_time: string;

  @Column({ nullable: true })
  actual_start_time: string;

  @Column({ nullable: true })
  planned_end_time: string;

  @Column({ nullable: true })
  actual_end_time: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
