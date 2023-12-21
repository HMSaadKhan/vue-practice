import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { Meal } from 'src/meal/entities';
import { Week } from '../entities';
import { MealType } from 'src/meal-type/entities';
  
  export default class CreateWeeklyMealDto {
    @IsNotEmpty()
    startDate: Date;
  
    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    meal: any;

    @IsNotEmpty()
    meal_type_id: any;
  
  }
  