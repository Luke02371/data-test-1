import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/common/get-user.decorator';
import { UserObjectDto } from 'src/users/dtos/user-object.dto';
import { NewWorkLogDto } from './dtos/new-work-log.dto';
import { WorkLogsService } from './work-logs.service';

@Controller('work-logs')
export class WorkLogsController {
  constructor(private workLogsService: WorkLogsService) {}

  @Get('/:id')
  getWorkLogs(@Param('id') permitNumber: string) {
    return this.workLogsService.getWorkLogs(permitNumber);
  }

  @Post('/add-work-log')
  getUsers(
    @GetUser(ValidationPipe) userData: UserObjectDto,
    @Body(ValidationPipe) newWorkLogDto: NewWorkLogDto,
  ) {
    return this.workLogsService.addWorkLog(userData, newWorkLogDto);
  }

  @Delete('/clear-table')
  clearTable() {
    return this.workLogsService.clearTable();
  }
}
