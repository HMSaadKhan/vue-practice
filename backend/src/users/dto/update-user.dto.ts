import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(7)
  @MaxLength(20)
  phoneNo: string;

  @IsOptional()
  points: Float32Array;
  @IsOptional()
  status: boolean;
}
