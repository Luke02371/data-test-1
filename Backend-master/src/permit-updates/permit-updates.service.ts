import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePermitDto } from './dtos/update-permit.dto';
import { PermitUpdatesRepository } from './permit-updates.repository';

@Injectable()
export class PermitUpdatesService {
  constructor(
    @InjectRepository(PermitUpdatesRepository)
    private permitUpdatesRepository: PermitUpdatesRepository,
  ) {}

  async getAllUpdates() {
    return this.permitUpdatesRepository.getAllUpdates();
  }

  async getPermitUpdates(id: string) {
    return this.permitUpdatesRepository.getPermitUpdates(id);
  }

  async updatePermitData(
    updatePermitDto: UpdatePermitDto,
    permitNumber: string,
  ) {
    return this.permitUpdatesRepository.updatePermitData(
      updatePermitDto,
      permitNumber,
    );
  }

  async clearPermitUpdates() {
    return this.permitUpdatesRepository.clearPermitUpdates();
  }

  async getAllActiveUpdates(id: string) {
    return this.permitUpdatesRepository.getAllActiveUpdates(id);
  }
}
