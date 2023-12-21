import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import Stripe from 'stripe';
import { MODULE_OPTIONS_TOKEN } from './stripe.module-definition';
import { StripeModuleOptions } from './stripeOptions.interface';
import { ConfigService } from '@nestjs/config';
import User from 'src/users/entities/users.entity';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;
  constructor(
    // @Inject(MODULE_OPTIONS_TOKEN) private options: StripeModuleOptions,
    readonly configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get<string>('stripe.STRIPE_API_KEY'), {
        apiVersion: '2023-10-16',
      });
  }

  getCustomers() {
    return this.stripe.customers.list();
  }



  async createPaymentIntent(totalAmount: number, options: Stripe.PaymentIntentCreateParams): Promise<Stripe.PaymentIntent> {
    if (totalAmount < 1) {
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: Number(totalAmount) * 100,
      currency: this.configService.get<string>('stripe.STRIPE_CURRENCY') ,
      payment_method_types: ['card']
    };
    const intent = await this.stripe.paymentIntents.create(paymentIntentParams);
    console.log(intent, 'intent')

    const paymentIntent = await this.stripe.paymentIntents.confirm(
        intent.id,
        {
          payment_method: 'pm_card_visa',
        //   return_url: 'https://www.example.com',
        }
      );
    return paymentIntent;
  }



  async createCustomer(user: any): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.username
      });

      console.log(customer, "customerrrrrrrrrrrrrrrrrrr")

      return customer;
    } catch (error) {
      // Handle any errors that occurred during customer creation
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }
}