import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Permit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  permit_number: string;

  @Column({ nullable: true })
  issued_date: string;

  @Column({ nullable: true })
  expiration_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  spatial_id: string;

  @Column({ nullable: true })
  contact_name: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column({ nullable: true })
  contact_address: string;
}
