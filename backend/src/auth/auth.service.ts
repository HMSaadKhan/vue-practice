import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResetPasswordDto, ResetPasswordRequestDto, SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import UsersService from '../users/users.service';
import AdminService from 'src/admin/admin.service';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private mailService: MailService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    const passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    delete user['password'];
    delete user['confirmPassword'];

    return { user, access_token: accessToken };
  }

  async adminSignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new NotFoundException('Invalid username or password');
    }
    const passwordIsValid = await admin.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: admin.id, username: admin.email };
    const accessToken = await this.jwtService.signAsync(payload);
    delete admin['password'];
    delete admin['confirmPassword'];

    return { admin, access_token: accessToken };
  }

  async resetPasswordRequest(forgetPasswordDto: ResetPasswordRequestDto) {
    const { email } = forgetPasswordDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const token = crypto.randomBytes(16).toString('hex');
    const saved = await this.usersService.resetPasswordRequest(token, user);
    if (saved) {
      const emailSent = await this.mailService.sendUserConfirmation(
        user,
        token,
      );
      if (emailSent)
        return {
          data: {
            message: 'Email sent',
          },
        };
    }
  }

  async resetAdminPasswordRequest(forgetPasswordDto: ResetPasswordRequestDto) {
    const { email } = forgetPasswordDto;
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new NotFoundException('User does not exist');
    }
    const token = crypto.randomBytes(16).toString('hex');
    const saved = await this.adminService.resetPasswordRequest(token, admin);
    if (saved) {
      const emailSent = await this.mailService.sendUserConfirmation(
        admin,
        token,
      );
      if (emailSent)
        return {
          data: {
            message: 'Email sent',
          },
        };
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    token: string,
    userType: string,
  ) {
    const { password, confirmPassword } = resetPasswordDto;
    if (password !== confirmPassword) {
      throw new UnauthorizedException('Password must be matched!');
    }
    if (userType === 'user') {
      const changePassword = await this.usersService.resetPassword(
        token,
        password,
      );
      if (changePassword) {
        return {
          status: true,
          message: 'Password changed',
        };
      }
    }
    if (userType === 'admin') {
      const changePassword = await this.adminService.resetPassword(
        token,
        password,
      );
      if (changePassword) {
        return {
          status: true,
          message: 'Password changed',
        };
      }
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (admin && (await admin.validatePassword(password))) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }
}
