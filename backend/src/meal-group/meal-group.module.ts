import { Module } from '@nestjs/common';
import MealGroupController  from './meal-group.controller';
import  MealGroupService from './meal-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealGroup } from './entities';

@Module({
  controllers: [MealGroupController],
  providers: [MealGroupService],
  imports: [TypeOrmModule.forFeature([MealGroup])],
  exports: [MealGroupService],
})
export class MealGroupModule {}
