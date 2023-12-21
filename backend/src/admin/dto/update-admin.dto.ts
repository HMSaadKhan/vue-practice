import {
    IsAlphanumeric,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export default class UpdateAdminDto {
  
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsOptional()
    @MinLength(7)
    @MaxLength(20)
    phoneNo: string;
  
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    status: boolean;

    @IsOptional()
    role_id : number;

    @IsOptional()
    @IsString()
    @MinLength(6, {message: 'Password must be of minimum 6 characters'})
    @MaxLength(20,  {message: 'Password must be of minimum 20 characters'})
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

}
  