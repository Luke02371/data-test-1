import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePermitDto } from './dtos/update-permit.dto';
import { PermitUpdatesService } from './permit-updates.service';

@Controller('permit-updates')
export class PermitUpdatesController {
  constructor(private permitUpdatesService: PermitUpdatesService) {}

  @Get('/get-all-records')
  async getAllUpdates() {
    return this.permitUpdatesService.getAllUpdates();
  }

  @Get('/get-active-updates/:id')
  async getAllActiveUpdates(@Param('id') id: string) {
    return this.permitUpdatesService.getAllActiveUpdates(id);
  }

  @Get('/:id')
  async getPermitUpdates(@Param('id') id: string) {
    return this.permitUpdatesService.getPermitUpdates(id);
  }

  @Post()
  async updatePermitData(
    @Query('permit_number') permitNumber: string,
    @Body(ValidationPipe) updatePermitDto: UpdatePermitDto,
  ) {
    console.log('PERMIT NUMBER', permitNumber);
    return this.permitUpdatesService.updatePermitData(
      updatePermitDto,
      permitNumber,
    );
  }

  @Delete('/clear-table')
  async clearPermitUpdates() {
    return this.permitUpdatesService.clearPermitUpdates();
  }
}
