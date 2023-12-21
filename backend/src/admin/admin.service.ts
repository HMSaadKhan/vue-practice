import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import Admin from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities';

@Injectable()
export default class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createAdmin(CreateAdminDto: CreateAdminDto) {
    const {
      username,
      email,
      password,
      phoneNo,
      role_id,
      status,
    } = CreateAdminDto;

    const alreadyAdmin = await this.findByEmail(email);

    if (alreadyAdmin) {
      throw new ConflictException('Admin already exist');
    }
    const user: Admin = new Admin();
    const role = await this.roleRepository.findOne({
      where: { id: role_id },
    });
    user.username = username;
    user.email = email;
    user.status = status;
    user.phoneNo = phoneNo;
    user.role_id = role;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    const response = await this.adminRepository.save(user);
    if (response) {
      return {
        message: "Admin created"
      }
    }
  }

  async resetPasswordRequest(token: string, admin: Admin) {
    try {
      admin.resetToken = token;
      const expiryDate = new Date();
      const date = new Date(expiryDate.getTime() + 360000);
      admin.resetTokenExpiration = date;
      return this.adminRepository.save(admin);
    } catch (error) {
      return { error };
    }
  }

  async resetPassword(token: string, password: string) {
    const admin = await this.findByToken(token);
    if (!admin)
      throw new UnauthorizedException('Password reset token is invalid!');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    admin.password = hashedPassword;
    admin.resetToken = null;
    admin.resetTokenExpiration = null;
    return this.adminRepository.save(admin);
  }

  async findByToken(token: string): Promise<Admin> {
    return this.adminRepository.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: MoreThan(new Date()),
      },
    });
  }

  findAllUser(): Promise<Admin[]> {
    return this.adminRepository.find({
      relations: {
        role_id : { permissions:true}
      },
      select: ['id', 'username', 'email', 'role_id', 'phoneNo', 'status'],
    });
  }

  
  async findAdminById(adminId: number): Promise<Admin> {
    const admin= await this.adminRepository.findOne({
      where: { id: adminId },
      relations: {
        role_id : { permissions:true}
      },
      select: ['id', 'username', 'email', 'role_id', 'phoneNo', 'status'],
    });
    if(!admin)
      throw new NotFoundException('User not found');
    return admin;
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const {
      email,
      username,
      status,
      phoneNo,
      role_id,
      password,
    } = updateAdminDto;
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const role = await this.roleRepository.findOne({
      where: { id: role_id },
    });
    if (!role) {
      throw new NotFoundException('Role not exist');
    }
    if (
      Object.keys(updateAdminDto).includes('password')
    ) {
      if (password.length === 0)
      throw new ForbiddenException("Password can't be empty");
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      admin.password = hashedPassword;
    }
    admin.username = username;
    admin.email = email;
    admin.status = status;
    admin.role_id = role;
    (admin.phoneNo = phoneNo), (admin.id = id);
    const updatedAdmin = await this.adminRepository.save(admin);
    if (updatedAdmin) {
      return {
        message: 'Admin updated',
      };
    }
  }

  async removeUser(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const deletedAdmin = await this.adminRepository.delete(id);
    if (deletedAdmin) {
      return {
        message: 'Admin deleted',
      };
    }
  }

  async findByEmail(identifier: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { email: identifier } });
  }
}
