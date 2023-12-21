import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyMealController } from './weekly-meal.controller';

describe('WeeklyMealController', () => {
  let controller: WeeklyMealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyMealController],
    }).compile();

    controller = module.get<WeeklyMealController>(WeeklyMealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


