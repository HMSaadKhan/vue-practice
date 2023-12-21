import {
    Equals,
      IsNotEmpty,
      IsString,
      MaxLength,
      MinLength,
    } from 'class-validator';
    
    export default class UpdatePermissionDto {
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(50)
        permission: string;
    }
    