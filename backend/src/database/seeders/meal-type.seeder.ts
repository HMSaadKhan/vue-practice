import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import mealTypeData from '../seeders/data/meal-type-data.json'
import { MealType } from 'src/meal-type/entities';

@Injectable()
export class MealTypeSeed implements Seeder {
  constructor(
    @InjectRepository(MealType)
    private readonly mealTypeRepository: Repository<MealType>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of mealTypeData) {
            await this.mealTypeRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.mealTypeRepository.query(
        `DELETE FROM meal_group`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
