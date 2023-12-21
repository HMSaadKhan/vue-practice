import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto';
import { Role } from './entities';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities';

@Injectable()
export default class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createRole(CreateRoleDto: CreateRoleDto) {
    const { role, permissions } = CreateRoleDto;

    const already = await this.findByRole(role);

    if (already) {
      throw new ConflictException('Role already exist');
    }
    const permissionArr = await this.permissionRepository.find({where: {id: In(permissions)}});
    
    console.log(CreateRoleDto, "create roleeeeeeeee")
    const newRole: Role = new Role();
    newRole.role = role;
    newRole.permissions = permissionArr;
    const response = await this.roleRepository.save(newRole);
    return {
      response,
      message: "Role created"
    };
  }

  async findByRole(identifier: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { role: identifier } });
  }

  findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions']
    });
  }

  async updateRole(id: number, updateRoleDto: CreateRoleDto) {
    const { role, permissions } = updateRoleDto;
    try {
      const findRole = await this.findRole(id)
      if(!findRole) {
       throw new NotFoundException("Role not found");
      }
      const permissionArr = await this.permissionRepository.find({where: {id: In(permissions)}})
      findRole.role = role;
      findRole.permissions = permissionArr;
      findRole.id = id;
      const updatedRole = await this.roleRepository.save(findRole);
      if (updatedRole) {
        return {
          updatedRole,
          message: 'Role updated',
        };
      }
    } catch (error) {
      return {error};
    }
  }
  async removeRole(id: number) {
    try {
      const findRole = await this.findRole(id)
      if(!findRole) {
       throw new NotFoundException("Role not found");
      }
      const deletedRole = await this.roleRepository.delete(id);
      if (deletedRole) {
        return {
          message: 'Role deleted'
        }
      }
    } catch (error) {
      return {error};
    }
  }


  async findRole(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }
}
