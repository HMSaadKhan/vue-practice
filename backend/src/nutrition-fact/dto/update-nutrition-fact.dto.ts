import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export default class UpdateNutritionFactDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
      nutrition_name: string;

    @IsOptional()
    @IsString()
      unit: string;
  }
  