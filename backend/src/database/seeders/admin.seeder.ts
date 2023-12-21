import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import Admin from 'src/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import adminData from '../seeders/data/admin-data.json'
import { Role } from 'src/roles/entities';

@Injectable()
export class AdminSeed implements Seeder {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async seed(): Promise<any> {
    try {
        for(const data of adminData) {
            const role = await this.roleRepository.findOne({where: {id: data.role_id}})
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword
            const data1 = {...data, password: hashedPassword, role_id: role}
            await this.adminRepository.save(data1);
        }
    } catch (err) {
        console.log(err);
    }
  }

  async drop(): Promise<any> {
    try {
      await this.adminRepository.query(
        `DELETE FROM admin`
      );
    } catch (e) {
      console.error('error seeding db : ', e);
    }
  }
}
