import { Injectable, ConflictException, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateUserSubscriptionDto, UpdateUserSubscriptionDto } from './dto';
import UserSubscription from './entities/user-subscription.entity';
import { StripeService } from 'src/stripe/stripe.service';
import User from 'src/users/entities/users.entity';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export default class SubscriptionService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(UserSubscription)
    private subscriptionRepository: Repository<UserSubscription>,
    private stripeService: StripeService,
  ) {}

  async createSubscription(createSubscriptionDto: CreateUserSubscriptionDto, user: User) {
    const { start_date, end_date, subscription_type, coupon_id } =
      createSubscriptionDto;
    const subscriptionFee = +process.env.SUBSCRIPTION_FEE;

    try {
      const user = {
        username: 'user',
        email: 'user2@gmail.com',
      };
      const stripeCustomer = await this.stripeService.createCustomer(user);
      const paymentIntent = await this.stripeService.createPaymentIntent(
        subscriptionFee,
        {
          customer: stripeCustomer.id,
          amount: subscriptionFee * 100,
          currency: 'eur',
          description: 'Weekly Subscription Fee'
        },
      );
      if (paymentIntent.status === 'succeeded') {
        const newSubscription = await this.subscriptionRepository.create({});

        await this.subscriptionRepository.save(newSubscription);

        return newSubscription;
      } else {
        throw new ConflictException('Payment failed. Please try again.');
      }
    } catch (error) {
      throw new ConflictException(`Error processing payment: ${error.message}`);
    }
  }

  async getAllSubscriptions() {
    const subscriptionFee = +process.env.SUBSCRIPTION_FEE;
    return;
    const user = {
      username: 'user',
      email: 'user2@gmail.com',
    };
    const stripeCustomer = await this.stripeService.createCustomer(user);
    const paymentIntent = await this.stripeService.createPaymentIntent(
      subscriptionFee,
      {
        customer: stripeCustomer.id,
        amount: subscriptionFee * 100,
        currency: 'eur',
        description: 'Weekly Subscription Fee',
      },
      );
      console.log(paymentIntent.status, "paymenttttttttttttttttt")

    try {
    } catch (error) {
      throw new ConflictException(`Error processing payment: ${error.message}`);
    }
    return this.stripeService.getCustomers();
  }
}
