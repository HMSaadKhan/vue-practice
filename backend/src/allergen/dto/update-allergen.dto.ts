import {
  IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export default class UpdateAllergenDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    allergy_name: string;
  
    @IsOptional()
    status: boolean;
  }
  