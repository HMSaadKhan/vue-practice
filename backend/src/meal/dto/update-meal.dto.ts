import { IsNotEmpty, IsInt, Min, IsOptional, MaxLength, IsObject, isNotEmpty } from 'class-validator';
import { NutritionFactInterface } from 'src/common/interfaces';
import { MealAllergen, MealNutrition } from '../entities';
import { Keyword } from 'src/meal-keyword/entities';
import { Allergen } from 'src/allergen/entities';

export default class UpdateMealDto {
  readonly name: string;

  @IsOptional()
  readonly product_detail?: string;

  @IsOptional()
  readonly listing_page?: string;

  readonly price?: Float32Array;

  readonly group: number;

  readonly type: number;

  readonly allergens: any;

  readonly nutrition_facts: MealNutrition;
  
  readonly image: string;

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
