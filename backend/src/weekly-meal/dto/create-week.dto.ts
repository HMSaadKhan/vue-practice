import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export default class CreateWeekDto {
    @IsNotEmpty()
    startDate: Date;
  
    @IsNotEmpty()
    endDate: Date;
  
  }
  