import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Permission } from 'src/permissions/entities';

export default class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  role: string;

  @IsNotEmpty()
  readonly permissions: Permission[];

}
