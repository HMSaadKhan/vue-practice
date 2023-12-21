import {
  Body,
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import AuthService from './auth.service';
import UsersService from '../users/users.service';
import { CreateUserDto as RegisterUserDto } from '../users/dto';
import { SignInDto, ResetPasswordDto, ResetPasswordRequestDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.createUser(registerUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPasswordRequest(
    @Body() resetPasswordDto: ResetPasswordRequestDto,
  ) {
    return this.authService.resetPasswordRequest(resetPasswordDto);
  }

  @Post('admin/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetAdminPasswordRequest(
    @Body() resetPasswordDto: ResetPasswordRequestDto,
  ) {
    return this.authService.resetAdminPasswordRequest(resetPasswordDto);
  }

  @Post('reset-password/:token')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() newPasswordDto: ResetPasswordDto,
    // @Res() res,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(newPasswordDto, token, 'user');
  }

  @Post('admin/reset-password/:token')
  @HttpCode(HttpStatus.OK)
  async resetAdminPassword(
    @Body() newPasswordDto: ResetPasswordDto,
    // @Res() res,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(newPasswordDto, token, 'admin');
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  async adminSignIn(@Body() signInDto: SignInDto) {
    return this.authService.adminSignIn(signInDto);
  }
}
