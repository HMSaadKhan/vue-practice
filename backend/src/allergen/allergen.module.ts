import { Module } from '@nestjs/common';
import AllergenService from './allergen.service';
import AllergenController from './allergen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from './entities';

@Module({
  providers: [AllergenService],
  controllers: [AllergenController],
  imports: [TypeOrmModule.forFeature([Allergen])],
  exports: [AllergenService],
})
export class AllergenModule {}
