import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import allergenData from '../seeders/data/allergen-data.json'
import { Allergen } from 'src/allergen/entities';

@Injectable()
export class AllergenSeed implements Seeder {
  constructor(
    @InjectRepository(Allergen)
    private readonly allergenRepository: Repository<Allergen>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of allergenData) {
            await this.allergenRepository.save({...data, meals: []});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.allergenRepository.query(
        `DELETE FROM allergens`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
