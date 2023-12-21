import { Module } from '@nestjs/common';
import SubscriptionController from './subscription.controller';
import SubscriptionService from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserSubscription from './entities/user-subscription.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    StripeModule,
    TypeOrmModule.forFeature([UserSubscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
