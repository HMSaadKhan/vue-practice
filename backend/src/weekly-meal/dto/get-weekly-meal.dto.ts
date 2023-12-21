import {
    IsNotEmpty,
  } from 'class-validator';
  
  export default class GetWeeklyMealDto {
    @IsNotEmpty()
    date: Date;
  
  }
  