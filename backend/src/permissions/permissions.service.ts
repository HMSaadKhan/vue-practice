import {
    Injectable,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreatePermissionDto, UpdatePermissionDto } from './dto';
  import Permission from './entities/permission.entity';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export default class PermissionsService {
    constructor(
      @InjectRepository(Permission)
      private readonly permissionRepository: Repository<Permission>,
    ) {}
  
    async createPermission(createPermissionDto: CreatePermissionDto) {
      const { permission } = createPermissionDto;
      const already = await this.findByPermission(permission);
  
      if (already) {
        throw new ConflictException('Permission already exist');
      }
      const newPermission: Permission = new Permission();
      newPermission.permission = permission;
      const response = await this.permissionRepository.save(newPermission);
      return {
        response,
        message: 'Permission created',
      };
    }
  
    async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
      const { permission } = updatePermissionDto;
      const findType = await this.findPermission(id);
      if (!findType) {
        throw new NotFoundException('Permission not found');
      }
      const already = await this.findByPermission(permission);
      if (already) {
        throw new ConflictException('Permission already exist');
      }
      findType.permission = permission;
      findType.id = id;
      const updatedType = await this.permissionRepository.save(findType);
      if (updatedType) {
        return {
          updatedType,
          message: 'Permission updated',
        };
      }
    }
  
    async removePermission(id: number) {
      const findType = await this.findPermission(id);
      if (!findType) {
        throw new NotFoundException('Permission not found');
      }
      const deletedType = await this.permissionRepository.delete(id);
      if (deletedType) {
        return {
          message: 'Permission deleted',
        };
      }
    }
  
    async findPermission(id: number): Promise<Permission> {
      return this.permissionRepository.findOneBy({ id });
    }
  
    async findByPermission(identifier: string): Promise<Permission> {
      try {
        return this.permissionRepository.findOne({ where: { permission: identifier } });
      } catch (error) {
        return error;
      }
    }
  
    findAllPermissions(): Promise<Permission[]> {
      try {
        return this.permissionRepository.find({
          relations: [
            'roles'
          ]
        });
      } catch (error) {
        return error;
      }
    }
  }
  
