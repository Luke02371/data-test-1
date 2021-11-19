import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdatePermitDto } from 'src/permit-updates/dtos/update-permit.dto';
import { PermitUpdate } from './permit-update.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Permit } from 'src/permits/permit.entity';
import { WorkLog } from 'src/work-logs/work-log.entity';

@EntityRepository(PermitUpdate)
export class PermitUpdatesRepository extends Repository<PermitUpdate> {
  async getPermitUpdates(id: string) {
    const updates = await this.find({ permit_number: id });

    return updates;
  }

  async updatePermitData(
    updatePermitDto: UpdatePermitDto,
    permitNumber: string,
  ) {
    const {
      permit_number,
      vendor,
      version,
      id,
      client,
      status,
      street_lane,
      bike_lane,
      traffic_light,
      bus_stop_impact,
      setup_by,
      torn_down_at,
      image_url,
      lat_app,
      long_app,
      timestamp,
      username,
    } = updatePermitDto;

    console.log('PERMIT UPDATE DTO', updatePermitDto);

    const permitRepo = getRepository(Permit);
    const permitFound = await permitRepo.findOne({
      permit_number: permitNumber,
    });
    if (permitFound) {
      const update = new PermitUpdate();
      update.permit_number = permit_number;
      update.username = username;
      update.vendor = vendor;
      update.version = version;
      update.on_point_id = id;
      update.client = client;
      update.status = status;
      update.street_lanes = street_lane;
      update.bike_lanes = bike_lane;
      update.signal_impacted = traffic_light;
      update.transit_impacted = bus_stop_impact;
      update.setup_by = setup_by;
      update.torn_down_at = torn_down_at;
      update.image_url = image_url;
      update.gps_lat = lat_app;
      update.gps_long = long_app;
      update.timestamp = timestamp;

      // if status is setup, try and pair it to a work log
      // if none meet the criteria, just continue and save like normal
      if (status === 'setup') {
        const workLogRepo = getRepository(WorkLog);
        const possibleWorkLogs = workLogRepo.find({
          permit_number: permit_number,
          actual_start_time: null,
        });
        console.log('POSSIBLE WORK LOGS', possibleWorkLogs);
        const sevenHours = 7 * 3600000;
        const dateToCheck = Date.parse(timestamp);

        const theOneWorkLog = (await possibleWorkLogs).find((workLog) => {
          const plannedStart = Date.parse(workLog.planned_start_time);
          const twoHours = 2 * 3600000;
          const plannedStartMinusTwoHours = plannedStart - twoHours;
          const plannedStartPlusTwoHours = plannedStart + twoHours;
          console.log('DATE TO CHECK', dateToCheck);
          console.log('PLANNED MINUS 2 HOURS', plannedStartMinusTwoHours);
          console.log('PLANNED PLUS 2 HOURS', plannedStartPlusTwoHours);
          if (
            dateToCheck > plannedStartMinusTwoHours &&
            dateToCheck < plannedStartPlusTwoHours &&
            !workLog.actual_start_time
          ) {
            return workLog;
          }
        });
        if (theOneWorkLog) {
          console.log('MADE IT TO THE SAVE AND PAIR PART');
          theOneWorkLog.actual_start_time = timestamp;
          await theOneWorkLog.save();
          update.work_log_id = theOneWorkLog.id;
        }
        try {
          await update.save();
          return {
            success: true,
            message: `Update for Permit ${permitNumber} successfully saved.`,
          };
        } catch (e) {
          throw new InternalServerErrorException(
            'Something went wrong while trying to save the update. Please check the request body and permit number.',
          );
        }
      }

      // if status is a teardown, check to see the corresponding setup has a work log associated then update and save
      // otherwise just save like normal
      if (status === 'teardown') {
        const workLogRepo = getRepository(WorkLog);
        const foundLinkToWorkLog = await this.findOne({
          version: version,
          permit_number: permit_number,
          status: 'setup',
          on_point_id: id,
        });
        foundLinkToWorkLog.torn_down_at = torn_down_at;
        await foundLinkToWorkLog.save();

        if (foundLinkToWorkLog.work_log_id) {
          const workLog = await workLogRepo.findOne({
            id: foundLinkToWorkLog.work_log_id,
          });
          if (workLog) {
            workLog.actual_end_time = torn_down_at;
            await workLog.save();
          }
        }
        try {
          await update.save();
          return {
            success: true,
            message: `Update for Permit ${permitNumber} successfully saved.`,
          };
        } catch (e) {
          throw new InternalServerErrorException(
            'Something went wrong while trying to save the update. Please check the request body and permit number.',
          );
        }
      }
      if (status === 'update') {
        try {
          await update.save();
          return {
            success: true,
            message: `Update for Permit ${permitNumber} successfully saved.`,
          };
        } catch (e) {
          throw new InternalServerErrorException(
            'Something went wrong while trying to save the update. Please check the request body and permit number.',
          );
        }
      }
    } else {
      throw new InternalServerErrorException(
        'The permit number provided was not found in the system, Please double check the permit number and try again or contact support.',
      );
    }
  }

  async clearPermitUpdates() {
    await this.clear();

    return {
      message: 'cleared permit update table',
    };
  }

  async getAllUpdates() {
    const allUpdates = await this.find();

    return allUpdates;
  }

  async getAllActiveUpdates(id: string) {
    const activeUpdates = await this.count({
      status: 'setup',
      torn_down_at: null,
      permit_number: id,
    });

    return activeUpdates;
  }
}
