import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Coupons from './entities/coupons.entity';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupons)
    private readonly couponsRepository: Repository<Coupons>,
  ) {}

  async createCoupon(CreateCouponDto: CreateCouponDto) {
    const { couponCode } = CreateCouponDto;
    try {
      const isExist = await this.couponsRepository.findOne({
        where: { couponCode },
      });

      if (isExist) {
        throw new ConflictException('Coupon already exist');
      }

      const response = await this.couponsRepository.save(CreateCouponDto);

      return {
        response,
        message: 'New coupon created',
      };
    } catch (error) {
      return { error };
    }
  }
  async editCoupon(id: number, CouponDto: CreateCouponDto) {
    try {
      const isExist = await this.couponsRepository.findOneBy({ id });

      if (!isExist) {
        throw new ConflictException('Coupon not exists');
      }
      const edited = { id, ...CouponDto };

      const response = await this.couponsRepository.save(edited);
      return {
        response,
        message: 'Coupon edited Successfully',
      };
    } catch (error) {
      return { error };
    }
  }
  async getCouponById(id: number) {
    try {
      const coupon = await this.couponsRepository.findOneBy({ id });

      if (!coupon) {
        throw new ConflictException('Coupon not exists');
      }
      return {
        coupon,
        message: 'Coupon got Successfully',
      };
    } catch (error) {
      return { error };
    }
  }
  async getAllCoupons() {
    try {
      const coupons = await this.couponsRepository.find();
      if (!coupons) {
        throw new ConflictException('Coupons not exists');
      }
      return {
        coupons,
        message: 'Coupons got Successfully',
      };
    } catch (error) {
      return { error };
    }
  }
  async deleteCoupon(id: number) {
    try {
      const coupon = await this.couponsRepository.findOneBy({ id });

      if (!coupon) {
        throw new ConflictException('Coupons not exists');
      }

      const deleted = await this.couponsRepository.delete({ id });
      return {
        message: 'Coupon deleted Successfully',
      };
    } catch (error) {
      return { error };
    }
  }
}
