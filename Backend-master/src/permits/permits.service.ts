import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermitRepository } from './permits.repository';

@Injectable()
export class PermitsService {
  constructor(
    @InjectRepository(PermitRepository)
    private permitRepository: PermitRepository,
  ) {}

  async getPermits(page) {
    return this.permitRepository.getPermits(page);
  }

  async retrieveFormattedPermits() {
    return this.permitRepository.retrieveFormattedPermits();
  }

  async loadPermits() {
    return this.permitRepository.loadPermits();
  }

  async clearPermitsTable() {
    return this.permitRepository.clearPermitTable();
  }

  async getDepartureBoard() {
    return await this.permitRepository.getDepartureBoard();
  }

  async getSinglePermit(id: string) {
    return this.permitRepository.getSinglePermit(id);
  }
}
