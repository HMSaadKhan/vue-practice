import { Module } from '@nestjs/common';
import RolesService from './roles.service';
import RolesController from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities';
import { Permission } from 'src/permissions/entities';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  exports: [RolesService],
})
export class RolesModule {}
