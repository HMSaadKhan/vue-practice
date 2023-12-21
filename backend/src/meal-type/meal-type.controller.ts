import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import MealTypeService from './meal-type.service';
import { CreateMealTypeDto } from './dto';

@Controller('mealTypes')
export default class MealTypeController {
  constructor(private readonly mealTypeService: MealTypeService) {}

  @Post()
  create(@Body() createMealTypeDto: CreateMealTypeDto) {
    return this.mealTypeService.createType(createMealTypeDto);
  }

  @Get()
  findAll() {
    return this.mealTypeService.findAllTypes();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: CreateMealTypeDto) {
    return this.mealTypeService.updateMealType(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealTypeService.removeType(+id);
  }
}
