import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import User from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        points,
        status,
        phoneNo,
      } = createUserDto;

      const alreadyUser = await this.findByEmail(email);

      if (alreadyUser) {
        throw new ConflictException('User already exist');
      }
      if (password !== confirmPassword) {
        throw new ForbiddenException('Password must be matched');
      }
      const user: User = new User();
      user.username = username;
      user.email = email;
      user.phoneNo = phoneNo;
      user.points = points;
      user.status = status;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      const response = await this.userRepository.save(user);
      return response;
    } catch (error) {
      return { error };
    }
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { username, email, status, points, phoneNo } = updateUserDto;
    try {
      const user = await this.findOne(id);
      if (user) {
        throw new NotFoundException('User not found');
      }
      user.username = username;
      user.email = email;
      user.status = status;
      user.phoneNo = phoneNo;
      user.points = points;
      user.id = id;
      const updateUser = await this.userRepository.save(user);
      if (updateUser) {
        return {
          message: 'User updated',
          updateUser,
        };
      }
    } catch (error) {
      return { error };
    }
  }

  async resetPasswordRequest(token: string, user: User) {
    user.resetToken = token;
    const expiryDate = new Date();
    const date = new Date(expiryDate.getTime() + 360000);
    user.resetTokenExpiration = date;
    return this.userRepository.save(user);
  }

  async resetPassword(token: string, password: string) {
    const user = await this.findByToken(token);
    if (!user)
      throw new UnauthorizedException(
        'Password reset token is invalid!',
      );
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    return this.userRepository.save(user);
  }

  async removeUser(id: number) {
    try {
      const user = await this.findOne(id);
      if (user) {
        throw new NotFoundException('User not found');
      }
      const deleteduser = await this.userRepository.delete(id);
      if (deleteduser) {
        return {
          message: 'User deleted',
        };
      }
    } catch (error) {
      return { error };
    }
  }

  async findByEmail(identifier: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: identifier } });
  }

  async findByToken(token: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: MoreThan(new Date()),
      },
    });
  }
}
