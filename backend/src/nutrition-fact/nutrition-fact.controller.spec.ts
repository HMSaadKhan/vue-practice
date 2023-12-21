import { Test, TestingModule } from '@nestjs/testing';
import NutritionFactController from './nutrition-fact.controller';

describe('NutritionFactController', () => {
  let controller: NutritionFactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionFactController],
    }).compile();

    controller = module.get<NutritionFactController>(NutritionFactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
