import { Module } from '@nestjs/common';
import MealController from './meal.controller';
import MealService from './meal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealGroup } from 'src/meal-group/entities';
import { Keyword } from 'src/meal-keyword/entities';
import { MealType } from 'src/meal-type/entities';
import { Meal, MealAllergen, MealKey, MealNutrition } from './entities';
import { NutritionFact } from 'src/nutrition-fact/entities';
import { Allergen } from 'src/allergen/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealGroup,
      Keyword,
      MealType,
      Meal,
      NutritionFact,
      MealNutrition,
      Allergen,
      // MealKey,
      // MealAllergen,
    ]),
  ],
  controllers: [MealController],
  providers: [MealService],
  exports: [MealService],
})
export class MealModule {}
