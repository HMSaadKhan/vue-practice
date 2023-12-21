import { Module } from '@nestjs/common';
import PermissionsController from './permissions.controller';
import PermissionsService from './permissions.service';
import { Permission, Role } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
