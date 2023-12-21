import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import mealGroupData from '../seeders/data/meal-group-data.json'
import { MealGroup } from 'src/meal-group/entities';

@Injectable()
export class MealGroupSeed implements Seeder {
  constructor(
    @InjectRepository(MealGroup)
    private readonly mealGroupRepository: Repository<MealGroup>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of mealGroupData) {
            await this.mealGroupRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.mealGroupRepository.query(
        `DELETE FROM meal_group`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
