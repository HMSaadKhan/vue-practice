import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import NutritionFactService from './nutrition-fact.service';
  import { CreateNutritionFactDto, UpdateNutritionFactDto } from './dto';
  
  @Controller('nutrition-fact')
  export default class NutritionFactController {
    constructor(private readonly nutritionFactService: NutritionFactService) {}
  
    @Post()
    create(@Body() createNutritionFactDto: CreateNutritionFactDto) {
      return this.nutritionFactService.createGroup(createNutritionFactDto);
    }
  
    @Get()
    findAll() {
      return this.nutritionFactService.findAllFacts();
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateNutritionFactDto: UpdateNutritionFactDto) {
      return this.nutritionFactService.updateNutritionFact(+id, updateNutritionFactDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.nutritionFactService.removeGroup(+id);
    }
  }
  
