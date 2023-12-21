import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyMealService } from './weekly-meal.service';

describe('WeeklyMealService', () => {
  let service: WeeklyMealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyMealService],
    }).compile();

    service = module.get<WeeklyMealService>(WeeklyMealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
