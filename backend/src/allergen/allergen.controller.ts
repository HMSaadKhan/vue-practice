import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import AllergenService from './allergen.service';
import { CreateAllergenDto, UpdateAllergenDto } from './dto';

@Controller('allergens')
export default class AllergenController {
  constructor(private readonly allergenService: AllergenService) {}

  @Post()
  create(@Body() createAllergenDto: CreateAllergenDto) {
    return this.allergenService.createAllergy(createAllergenDto);
  }

  @Get()
  findAll() {
    return this.allergenService.findAllAllergen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allergenService.findAllergyById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAllergenDto: UpdateAllergenDto,
  ) {
    return this.allergenService.updateAllergy(+id, updateAllergenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergenService.removeAllergy(+id);
  }
}
