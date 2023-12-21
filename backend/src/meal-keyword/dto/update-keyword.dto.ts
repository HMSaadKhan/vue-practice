import {
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export default class CreateMealKeywordDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    key_name: string;
  
    @IsOptional()
    status: boolean;
  }
  