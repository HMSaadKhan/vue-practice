import {
    Equals,
      IsNotEmpty,
      IsString,
      MaxLength,
      MinLength,
    } from 'class-validator';
    
    export default class CreateMealGroupDto {
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(50)
        group: string;
    }
    