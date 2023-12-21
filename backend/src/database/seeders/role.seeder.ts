import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import rolesData from '../seeders/data/role-data.json'
import { Role } from 'src/roles/entities';

@Injectable()
export class RoleSeed implements Seeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of rolesData) {
            await this.roleRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.roleRepository.query(
        `DELETE FROM roles`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
