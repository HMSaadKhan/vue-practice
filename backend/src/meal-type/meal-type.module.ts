import { Module } from '@nestjs/common';
import MealTypeController from './meal-type.controller';
import MealTypeService from './meal-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealType } from './entities';

@Module({
  controllers: [MealTypeController],
  providers: [MealTypeService],
  imports: [TypeOrmModule.forFeature([MealType])],
  exports: [MealTypeService],
})
export class MealTypeModule {}
