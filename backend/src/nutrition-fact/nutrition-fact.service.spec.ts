import { Test, TestingModule } from '@nestjs/testing';
import NutritionFactService from './nutrition-fact.service';

describe('NutritionFactService', () => {
  let service: NutritionFactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutritionFactService],
    }).compile();

    service = module.get<NutritionFactService>(NutritionFactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
