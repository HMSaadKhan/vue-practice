import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Coupons from './entities/coupons.entity';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [TypeOrmModule.forFeature([Coupons])],
  exports: [CouponsService],
})
export class CouponsModule {}
