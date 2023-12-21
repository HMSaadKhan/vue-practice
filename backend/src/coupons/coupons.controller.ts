import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCoupon(createCouponDto);
  }

  @Get()
  getAllCoupons() {
    return this.couponsService.getAllCoupons();
  }

  @Get(':id')
  getCouponById(@Param('id') id: string) {
    return this.couponsService.getCouponById(+id);
  }

  @Put(':id')
  updateCoupon(@Param('id') id: string, @Body() updateCoupon: CreateCouponDto) {
    return this.couponsService.editCoupon(+id, updateCoupon);
  }

  @Delete(':id')
  deleteCoupon(@Param('id') id: string) {
    return this.couponsService.deleteCoupon(+id);
  }
}
