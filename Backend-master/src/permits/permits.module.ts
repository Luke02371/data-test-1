import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitsController } from './permits.controller';
import { PermitRepository } from './permits.repository';
import { PermitsService } from './permits.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermitRepository])],
  controllers: [PermitsController],
  providers: [PermitsService],
})
export class PermitsModule {}
