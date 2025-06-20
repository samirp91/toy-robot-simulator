import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { PositionHistoryService } from './position-history.service';
import { CreatePositionHistoryDto } from './dto/create-position-history.dto';

@Controller('position-history')
export class PositionHistoryController {
  constructor(
    private readonly positionHistoryService: PositionHistoryService,
  ) {}

  @Post()
  create(@Body() createPositionHistoryDto: CreatePositionHistoryDto) {
    return this.positionHistoryService.create(createPositionHistoryDto);
  }

  @Get('last-position/:id')
  async getLastPosition(@Param('id') id: string) {
    const row = await this.positionHistoryService.getLastPosition(id);
    if (!row) return null;

    return {
      coordinates: { x: row.x, y: row.y },
      direction: row.direction,
      id: row.userId.toString(),
      isActive: true,
      isMovable: true,
      seq: row.seq,
    };
  }
}
