import { InternalServerErrorException } from '@nestjs/common';
import { WorkLog } from './work-log.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { NewWorkLogDto } from './dtos/new-work-log.dto';
import { UserObjectDto } from 'src/users/dtos/user-object.dto';
import { Permit } from 'src/permits/permit.entity';

@EntityRepository(WorkLog)
export class WorkLogsRepository extends Repository<WorkLog> {
  async clearTable() {
    await this.clear();
    return 'Work log table cleared.';
  }

  async getWorkLogs(permitNumber) {
    console.log('PERMIT NUMBER', permitNumber);
    try {
      const workLogs = await this.find({ permit_number: permitNumber });
      return workLogs;
    } catch (e) {}
  }

  async addWorkLog(userData: UserObjectDto, newWorkLogDto: NewWorkLogDto) {
    const { planned_start_time, planned_end_time, permit_number } =
      newWorkLogDto;
    const permitRepo = getRepository(Permit);
    const permit = await permitRepo.findOne({ permit_number: permit_number });
    console.log('NEW WORK LOG', newWorkLogDto);

    if (permit) {
      try {
        const workLog = new WorkLog();
        workLog.permit_number = permit_number;
        workLog.planned_start_time = planned_start_time;
        workLog.planned_end_time = planned_end_time;
        await workLog.save();
        return {
          success: true,
          message: 'successfully added a work log to the permit',
        };
      } catch (e) {
        throw new InternalServerErrorException(
          'Something went wrong, please double check the permit number and try again.',
        );
      }
    } else {
      throw new InternalServerErrorException(
        'Something went wrong, please double check the permit number and try again.',
      );
    }
  }
}
