import { IsNotEmpty, IsInt, Min, IsOptional, MaxLength, IsObject, isNotEmpty } from 'class-validator';
import { NutritionFactInterface } from 'src/common/interfaces';
import { MealAllergen, MealNutrition } from '../entities';
import { Keyword } from 'src/meal-keyword/entities';

export default class CreateMealDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly product_detail?: string;

  @IsOptional()
  readonly listing_page?: string;

  @IsNotEmpty()
  readonly price?: Float32Array;

  @IsNotEmpty()
  readonly group: number;

  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  readonly allergens: any;

  @IsObject({ each: true })  
  readonly nutrition_facts: MealNutrition;
  
  readonly image: string;

  @IsNotEmpty()
  readonly keywords: any;

  @IsOptional()
  // @MaxLength(20)
  readonly tailor_meal?: string;

  readonly serving: Float32Array;

  @IsOptional()
  readonly instructions?: string;

  @IsOptional()
  readonly features?: string;

  @IsOptional()
  readonly ingredients?: string;


}
