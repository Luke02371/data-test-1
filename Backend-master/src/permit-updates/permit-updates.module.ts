import { Module } from '@nestjs/common';
import { PermitUpdatesService } from './permit-updates.service';
import { PermitUpdatesController } from './permit-updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitUpdatesRepository } from './permit-updates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermitUpdatesRepository])],
  providers: [PermitUpdatesService],
  controllers: [PermitUpdatesController],
})
export class PermitUpdatesModule {}
