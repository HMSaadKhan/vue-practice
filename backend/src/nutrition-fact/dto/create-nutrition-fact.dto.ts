import {
      IsNotEmpty,
      IsString,
      MaxLength,
      MinLength,
    } from 'class-validator';
    
    export default class CreateNutritionFactDto {
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(50)
        nutrition_name: string;

      @IsNotEmpty()
      @IsString()
        unit: string;
    }
    