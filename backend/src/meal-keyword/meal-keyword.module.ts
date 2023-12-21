import { Module } from '@nestjs/common';
import MealKeywordService from './meal-keyword.service';
import MealKeywordController from './meal-keyword.controller';
import { Keyword } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MealKeywordService],
  controllers: [MealKeywordController],
  imports: [TypeOrmModule.forFeature([Keyword])],
  exports: [MealKeywordService],
})
export class MealKeywordModule {}
