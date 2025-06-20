import { Test, TestingModule } from '@nestjs/testing';
import { PositionHistoryService } from './position-history.service';

describe('PositionHistoryService', () => {
  let service: PositionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionHistoryService],
    }).compile();

    service = module.get<PositionHistoryService>(PositionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
