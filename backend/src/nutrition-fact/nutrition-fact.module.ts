import { Module } from '@nestjs/common';
import NutritionFactService from './nutrition-fact.service';
import  NutritionFactController from './nutrition-fact.controller';
import { NutritionFact } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [NutritionFactService],
  controllers: [NutritionFactController],
  imports: [TypeOrmModule.forFeature([NutritionFact])],
  exports: [NutritionFactService]
})
export class NutritionFactModule {}
