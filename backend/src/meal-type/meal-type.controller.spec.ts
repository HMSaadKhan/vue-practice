import { Test, TestingModule } from '@nestjs/testing';
import MealTypeController from './meal-type.controller';

describe('MealTypeController', () => {
  let controller: MealTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealTypeController],
    }).compile();

    controller = module.get<MealTypeController>(MealTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
