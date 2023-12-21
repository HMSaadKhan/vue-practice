import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import MealKeywordService from './meal-keyword.service';
  import { CreateKeywordDto, UpdateKeywordDto } from './dto';
  
  @Controller('meal-keyword')
  export default class MealKeywordController {
    constructor(private readonly mealKeywordService: MealKeywordService) {}
  
    @Post()
    create(@Body() createKeywordDto: CreateKeywordDto) {
      return this.mealKeywordService.createMealKey(createKeywordDto);
    }
  
    @Get()
    findAll() {
      return this.mealKeywordService.findAllKeywords();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.mealKeywordService.findOne(+id)
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
      return this.mealKeywordService.updateMealKeyword(+id, updateKeywordDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.mealKeywordService.removeKeyword(+id);
    }
  }
  

