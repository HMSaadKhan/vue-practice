import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import MealGroupService from './meal-group.service';
  import { CreateMealGroupDto } from './dto';
  
  @Controller('mealGroup')
  export default class MealGroupController {
    constructor(private readonly mealGroupService: MealGroupService) {}
  
    @Post()
    create(@Body() createMealTypeDto: CreateMealGroupDto) {
      return this.mealGroupService.createGroup(createMealTypeDto);
    }
  
    @Get()
    findAll() {
      return this.mealGroupService.findAllGroups();
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: CreateMealGroupDto) {
      return this.mealGroupService.updateMealGroup(+id, updateRoleDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.mealGroupService.removeGroup(+id);
    }
  }
  
