import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PositionHistoryService } from './position-history.service';
import { PositionHistoryController } from './position-history.controller';
import { PositionHistory } from './entities/position-history.entity';

@Module({
  imports: [SequelizeModule.forFeature([PositionHistory])],
  controllers: [PositionHistoryController],
  providers: [PositionHistoryService],
})
export class PositionHistoryModule {}
