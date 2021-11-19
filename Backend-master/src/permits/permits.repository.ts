import { ConflictException, NotFoundException } from '@nestjs/common';
import { PermitUpdate } from 'src/permit-updates/permit-update.entity';
import { WorkLog } from 'src/work-logs/work-log.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Permit } from './permit.entity';
import { permits } from './static';

@EntityRepository(Permit)
export class PermitRepository extends Repository<Permit> {
  checkDates(permitExpireDate) {
    const now = Date.parse(Date());
    const twentyThreeHours = 23 * 3600000;
    const permitDatePlusTwentyThreeHours = permitExpireDate + twentyThreeHours;
    if (now > permitDatePlusTwentyThreeHours) {
      return 'expired';
    }
    if (now < permitDatePlusTwentyThreeHours) {
      return 'active';
    }
  }

  async getPermits(page) {
    const permits = await this.find({ status: 'Active - Issued' });
    // const permits = await this.createQueryBuilder('permit')
    //   .where('permit.status = :permitStatus')
    //   .take(50)
    //   .setParameters({ permitStatus: 'Active - Issued' })
    //   .getMany();

    const formattedPermits = permits.map((permit) => {
      const dateToCheck = Date.parse(permit.expiration_date);
      const checkedDateResult = this.checkDates(dateToCheck);
      if (checkedDateResult === 'active') {
        return permit;
      }
    });
    const filteredFormattedPermits = formattedPermits.filter(
      (permit) => typeof permit === 'object',
    );
    return {
      message: 'Permits found',
      permits: filteredFormattedPermits,
    };
  }

  async retrieveFormattedPermits() {
    const permits = await this.find({ status: 'Active - Issued' });

    const formattedPermits = permits.map((permit) => {
      const dateToCheck = Date.parse(permit.expiration_date);
      const checkedDateResult = this.checkDates(dateToCheck);
      if (checkedDateResult === 'active') {
        return {
          attributes: {
            CASENUMBER: permit.permit_number,
            STATUS: permit.status,
            DESCRIPTION: permit.description,
            EXPIREDATE: dateToCheck,
            OWNER: permit.owner,
          },
        };
      }
    });

    const filteredFormattedPermits = formattedPermits.filter(
      (permit) => typeof permit === 'object',
    );

    console.log('NUMBER OF ACTIVE PERMITS', filteredFormattedPermits.length);

    return { features: filteredFormattedPermits };
  }

  async loadPermits() {
    try {
      if (permits.length) {
        permits.map(async (permit) => {
          const {
            CASENUMBER,
            STATUS,
            DESCRIPTION,
            ISSUEDATE,
            EXPIREDATE,
            OWNER,
            SPATIALID,
            CONTACTADDRESS,
            CONTACTNAME,
            CONTACTNUMBER,
          } = permit.attributes;
          const permitToSave = new Permit();

          permitToSave.permit_number = CASENUMBER;
          permitToSave.status = STATUS;
          permitToSave.description = DESCRIPTION;
          permitToSave.issued_date = ISSUEDATE;
          permitToSave.expiration_date = EXPIREDATE;
          permitToSave.owner = OWNER;
          permitToSave.spatial_id = SPATIALID;
          permitToSave.contact_name = CONTACTNAME;
          permitToSave.contact_number = CONTACTNUMBER;
          permitToSave.contact_address = CONTACTADDRESS;
          await permitToSave.save();
        });
        return 'Permits Loaded Successfully';
      }
    } catch (e) {
      throw new ConflictException(
        e,
        'something went wrong loading new permits.',
      );
    }
  }

  async clearPermitTable() {
    try {
      await this.clear();
      return 'Table Cleared Successfully';
    } catch (e) {
      throw new ConflictException(
        e,
        'something went wrong clearing out the permits from the database.',
      );
    }
  }

  // Departure board logic
  async getDepartureBoard() {
    const permitUpdateRepo = getRepository(PermitUpdate);
    const permitRepo = getRepository(Permit);
    const workLogRepo = getRepository(WorkLog);
    const allWorkLogs = await workLogRepo.find();
    const sevenHours = 7 * 3600000;
    const twelveHours = 12 * 3600000;
    const dateToCheck = Date.now() - sevenHours;
    console.log('DATE TO CHECK', dateToCheck);
    const inTwelveHours = dateToCheck + twelveHours;
    const tenMinutes = 10 * 60000;
    const nowMinusTenMinutes = dateToCheck - tenMinutes;
    const permits = await permitRepo.find();

    const activeWorkLogs = allWorkLogs.map((workLog) => {
      const plannedStart = Date.parse(workLog.planned_start_time);
      const plannedEnd = Date.parse(workLog.planned_end_time);

      console.log('PLANNED START', plannedStart);
      console.log('PLANNED END', plannedEnd);
      const actualEndTime = workLog.actual_end_time
        ? Date.parse(workLog.actual_end_time)
        : undefined;
      if (
        (!actualEndTime &&
          plannedStart < inTwelveHours &&
          plannedEnd > dateToCheck) ||
        (!actualEndTime &&
          plannedStart < dateToCheck &&
          plannedEnd > dateToCheck) ||
        (actualEndTime && actualEndTime > nowMinusTenMinutes) ||
        (workLog.actual_start_time && !workLog.actual_end_time)
      ) {
        const permit = permits.find(
          (p) => p.permit_number === workLog.permit_number,
        );

        const returnable = {
          id: workLog.id,
          location: permit.description,
          permit_number: workLog.permit_number,
          planned_start_time: workLog.planned_start_time,
          planned_end_time: workLog.planned_end_time,
          actual_start_time: workLog.actual_start_time,
          actual_end_time: workLog.actual_end_time,
          version: null,
        };
        return returnable;
      }
    });

    // not sure how to link the permit updates to the departure board yet...
    const allPermitSetUps = await permitUpdateRepo.find({
      status: 'setup',
      torn_down_at: null,
      work_log_id: null,
    });

    const returnablePermitSetUps = allPermitSetUps.map((permitUpdate) => {
      const returnable = {
        permit_number: permitUpdate.permit_number,
        planned_start_time: null,
        planned_end_time: null,
        actual_start_time: permitUpdate.timestamp,
        actual_end_time: null,
        version: permitUpdate.version,
        gps_lat: permitUpdate.gps_lat,
        gps_long: permitUpdate.gps_long,
      };
      return returnable;
    });

    const returnableWorkLogs = activeWorkLogs.filter(
      (log) => log !== undefined,
    );

    const allPermitUpdates = await permitUpdateRepo.find();
    const allUpdatesFiltered = allPermitUpdates.filter(
      (p) => p.work_log_id !== null,
    );

    const workLogsWithLocation = returnableWorkLogs.map((log) => {
      console.log('UPDATES', allUpdatesFiltered);
      const update = allUpdatesFiltered.find(
        (u) =>
          u.permit_number === log.permit_number &&
          u.work_log_id === log.id &&
          u.status === 'setup' &&
          log.actual_start_time !== null,
      );
      if (update) {
        const returnable = {
          ...log,
          gps_lat: update.gps_lat,
          gps_long: update.gps_long,
        };
        return returnable;
      } else {
        const returnable = {
          ...log,
          gps_lat: undefined,
          gps_long: undefined,
        };
        return returnable;
      }
    });

    const returnableObjects = [
      ...workLogsWithLocation,
      ...returnablePermitSetUps,
    ];
    console.log('RETURN ABLES', returnableObjects[0]);

    return returnableObjects;
  }

  async getSinglePermit(id: string) {
    const permit = await this.findOne({ permit_number: id });

    if (permit) {
      const permitUpdateRepo = getRepository(PermitUpdate);
      const updates = await permitUpdateRepo.find({ permit_number: id });

      if (updates.length > 0) {
        const isThereActiveUpdates = updates.find(
          (update) => update.status === 'setup' && update.torn_down_at === null,
        );

        if (isThereActiveUpdates) {
          const returnable = { ...permit, work_zone_status: 'Set Up' };
          return returnable;
        } else {
          const returnable = { ...permit, work_zone_status: 'Tear Down' };
          return returnable;
        }
      } else {
        const returnable = { ...permit, work_zone_status: '' };
        return returnable;
      }
    } else {
      throw new NotFoundException(
        'The permit you are looking for has been disconnected. Please hang up and try again.',
      );
    }
  }
}
