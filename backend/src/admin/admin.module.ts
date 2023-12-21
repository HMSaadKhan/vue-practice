import { Module } from '@nestjs/common';
import AdminService from './admin.service';
import AdminController from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from './entities/admin.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Role])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
