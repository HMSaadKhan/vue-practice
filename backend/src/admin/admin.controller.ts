import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import AdminService from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';

@Controller('admin')
export default class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() CreateAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(CreateAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findAdminById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, UpdateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.removeUser(+id);
  }
}
