// user-subscription.dto.ts
import { IsInt, IsString, IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export default class CreateUserSubscriptionDto {
  @IsInt()
  user_id: number;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsInt()
  subscription_type: number;

  @IsInt()
  @IsOptional()
  coupon_id?: number;

  @IsNumber()
  @IsOptional()
  coupon_uses?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  delivery_amount?: number;

  @IsNumber()
  @IsOptional()
  discount_amount?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
