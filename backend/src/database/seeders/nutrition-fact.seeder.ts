import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import nutritionFactData from '../seeders/data/nutrition-fact-data.json'
import { MealType } from 'src/meal-type/entities';
import { NutritionFact } from 'src/nutrition-fact/entities';

@Injectable()
export class NutritionFactSeed implements Seeder {
  constructor(
    @InjectRepository(NutritionFact)
    private readonly nutritionFactRepository: Repository<NutritionFact>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of nutritionFactData) {
            await this.nutritionFactRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.nutritionFactRepository.query(
        `DELETE FROM meal_group`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
