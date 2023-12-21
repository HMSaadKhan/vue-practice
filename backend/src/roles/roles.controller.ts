import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import RolesService from './roles.service';
import { CreateRoleDto } from './dto';

@Controller('roles')
export default class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRole: CreateRoleDto) {
    return this.rolesService.createRole(createRole);
  }

  @Get()
  findAll() {
    return this.rolesService.findAllRoles();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findRole(+id);
  }

  @Delete(':id')
    remove(@Param('id') id: string) {
      return this.rolesService.removeRole(+id);
  }
}
