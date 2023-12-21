import { Module } from '@nestjs/common';
import WeeklyMealController from './weekly-meal.controller';
import WeeklyMealService from './weekly-meal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Week } from './entities';
import { Meal } from 'src/meal/entities';
import { MealType } from 'src/meal-type/entities';
import WeeklyMeal from './entities/weekly-meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Week, WeeklyMeal, Meal, MealType])],
  controllers: [WeeklyMealController],
  providers: [WeeklyMealService],
  exports: [WeeklyMealService],

})
export class WeeklyMealModule {}
