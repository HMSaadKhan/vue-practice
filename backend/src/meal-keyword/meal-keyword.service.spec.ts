import { Test, TestingModule } from '@nestjs/testing';
import MealKeywordService from './meal-keyword.service';

describe('MealKeywordService', () => {
  let service: MealKeywordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealKeywordService],
    }).compile();

    service = module.get<MealKeywordService>(MealKeywordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
