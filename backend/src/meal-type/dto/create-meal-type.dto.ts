import {
    Equals,
      IsNotEmpty,
      IsString,
      MaxLength,
      MinLength,
    } from 'class-validator';
    
    export default class CreateMealTypeDto {
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(50)
        type: string;
    }
    