import { Test, TestingModule } from '@nestjs/testing';
import MealKeywordController  from './meal-keyword.controller';

describe('MealKeywordController', () => {
  let controller: MealKeywordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealKeywordController],
    }).compile();

    controller = module.get<MealKeywordController>(MealKeywordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
