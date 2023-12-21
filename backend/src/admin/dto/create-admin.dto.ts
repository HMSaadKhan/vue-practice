import {
  Equals,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export default class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Password must be of minimum 6 characters'})
    @MaxLength(20,  {message: 'Password must be of minimum 20 characters'})
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsNotEmpty()
    @IsString()
    // @MinLength(7)
    // @MaxLength(20)
    phoneNo: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    status: boolean;

    @IsNotEmpty()
    role_id: number;
    
  
  }
  