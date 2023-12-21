import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import permissionData from '../seeders/data/permission-data.json'
import { Permission } from 'src/permissions/entities';

@Injectable()
export class PermissionSeed implements Seeder {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of permissionData) {
            await this.permissionRepository.save({...data});
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.permissionRepository.query(
        `DELETE FROM permission`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
