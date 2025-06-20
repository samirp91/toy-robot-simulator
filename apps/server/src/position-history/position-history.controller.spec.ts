import { Test, TestingModule } from '@nestjs/testing';
import { PositionHistoryController } from './position-history.controller';
import { PositionHistoryService } from './position-history.service';

describe('PositionHistoryController', () => {
  let controller: PositionHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionHistoryController],
      providers: [PositionHistoryService],
    }).compile();

    controller = module.get<PositionHistoryController>(PositionHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
