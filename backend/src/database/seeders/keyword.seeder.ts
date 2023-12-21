import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import keywordData from '../seeders/data/keyword-data.json'
import { MealGroup } from 'src/meal-group/entities';
import { Keyword } from 'src/meal-keyword/entities';

@Injectable()
export class KeywordSeed implements Seeder {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of keywordData) {
            await this.keywordRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.keywordRepository.query(
        `DELETE FROM keyword`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
