import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { CreateWeekDto, CreateWeeklyMealDto, GetWeeklyMealDto } from './dto';
import WeeklyMealService from './weekly-meal.service';
  
  @Controller('weekly-meal')
  export default class WeeklyMealController {
    constructor(private readonly weeklyMealService: WeeklyMealService) {}
  
    @Post()
    create(@Body() createWeeklyMealDto: CreateWeeklyMealDto) {
        console.log(createWeeklyMealDto, "creaeWeekDtoooooooooooooooooooooooooooooooooo")
      return this.weeklyMealService.createWeeklyMeal(createWeeklyMealDto);
    }

    @Put(':id')
    updateWeeklyMeal(@Body() updateWeeklyMealDto: CreateWeeklyMealDto, @Param('id') weekId: string ) {
        console.log(updateWeeklyMealDto, "creaeWeekDtoooooooooooooooooooooooooooooooooo")
      return this.weeklyMealService.updateWeeklyMeal(+weekId, updateWeeklyMealDto);
    }

    @Post('findAll')
    getWeeklyMeal(@Body() getWeeklyMealDto: GetWeeklyMealDto) {
        console.log(getWeeklyMealDto, "createWeekDtoooooooooooooooooooooooooooooooooo")
      return this.weeklyMealService.getWeeklyMeal(getWeeklyMealDto);
    }
}