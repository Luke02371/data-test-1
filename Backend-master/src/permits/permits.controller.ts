import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PermitsService } from './permits.service';

@Controller('permits')
export class PermitsController {
  constructor(private permitsService: PermitsService) {}

  @Get()
  getPermits(@Query('page') page: string) {
    return this.permitsService.getPermits(page);
  }
  @Get('/get-records')
  retrieveFormattedPermits() {
    return this.permitsService.retrieveFormattedPermits();
  }

  @Get('/get-departure-board')
  getDepartureBoard() {
    return this.permitsService.getDepartureBoard();
  }

  @Get('/:id')
  getSinglePermit(@Param('id') id: string) {
    return this.permitsService.getSinglePermit(id);
  }

  @Post('/load-permits')
  loadPermits() {
    return this.permitsService.loadPermits();
  }

  @Delete('/clear-table')
  clearPermitsTable() {
    return this.permitsService.clearPermitsTable();
  }
}
