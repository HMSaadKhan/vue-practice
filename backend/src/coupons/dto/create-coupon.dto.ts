import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  couponFor: string;

  @IsNotEmpty()
  @IsNumber()
  couponCount: number;

  @IsNotEmpty()
  @IsNumber()
  maxUsable: number;

  @IsBoolean()
  @IsNotEmpty()
  newUser: boolean;

  @IsNotEmpty()
  @IsString()
  limitType: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  discountType: string;

  @IsNumber()
  @IsNotEmpty()
  discountValue: number;

  @IsString()
  @IsNotEmpty()
  couponCode: string;
}
