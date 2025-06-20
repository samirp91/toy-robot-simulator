import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePositionHistoryDto } from './dto/create-position-history.dto';
import { PositionHistory } from './entities/position-history.entity';

@Injectable()
export class PositionHistoryService {
  constructor(
    @InjectModel(PositionHistory)
    private positionHistoryModel: typeof PositionHistory,
  ) {}

  async create(createPositionHistoryDto: CreatePositionHistoryDto) {
    const moves = createPositionHistoryDto.moves.map((move) => ({
      ...move,
      userId: createPositionHistoryDto.userId,
    }));

    await this.positionHistoryModel.bulkCreate(moves, { validate: true });
  }

  async getLastPosition(userId: string) {
    return await this.positionHistoryModel.findOne({
      where: { userId },
      order: [['seq', 'DESC']],
    });
  }
}
