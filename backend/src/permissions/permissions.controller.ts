import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import PermissionService from './permissions.service';
  import { CreatePermissionDto } from './dto';
  
  @Controller('permission')
  export default class PermissionsController {
    constructor(private readonly permissionService: PermissionService) {}
  
    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
      return this.permissionService.createPermission(createPermissionDto);
    }
  
    @Get()
    findAll() {
      return this.permissionService.findAllPermissions();
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: CreatePermissionDto) {
      return this.permissionService.updatePermission(+id, updateRoleDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.permissionService.removePermission(+id);
    }
  }
  

