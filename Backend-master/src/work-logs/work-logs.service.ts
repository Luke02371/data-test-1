import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserObjectDto } from 'src/users/dtos/user-object.dto';
import { NewWorkLogDto } from './dtos/new-work-log.dto';
import { WorkLogsRepository } from './work-log.repository';

@Injectable()
export class WorkLogsService {
  constructor(
    @InjectRepository(WorkLogsRepository)
    private workLogsRepository: WorkLogsRepository,
  ) {}

  async addWorkLog(userData: UserObjectDto, newWorkLogDto: NewWorkLogDto) {
    return this.workLogsRepository.addWorkLog(userData, newWorkLogDto);
  }

  async clearTable() {
    return this.workLogsRepository.clearTable();
  }

  async getWorkLogs(permitNumber) {
    return this.workLogsRepository.getWorkLogs(permitNumber);
  }
}
