import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import User  from 'src/users/entities/users.entity';
import Admin  from 'src/admin/entities/admin.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User | Admin, token: string) {
    const url = token;
    const emailSent = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Active Bistro Reset Password',
      template: './confirmation',
      context: { 
        url,
        name: user.username
      },
    });
    if(emailSent) {
      return true;
    }
 
  }
}
