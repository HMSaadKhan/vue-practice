import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
// import { RefreshTokenService } from './auth/refresh-token/refresh-token.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MealTypeModule } from './meal-type/meal-type.module';
import { RolesModule } from './roles/roles.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/httpExceptionFilter';
import { MealGroupModule } from './meal-group/meal-group.module';
import { CouponsModule } from './coupons/coupons.module';
import { AllergenModule } from './allergen/allergen.module';
import { NutritionFactModule } from './nutrition-fact/nutrition-fact.module';
import { MealKeywordModule } from './meal-keyword/meal-keyword.module';
import { MealModule } from './meal/meal.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PermissionsModule } from './permissions/permissions.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { StripeModule } from './stripe/stripe.module';
import stripeConfig from './config/stripe.config';
import { WeeklyMealModule } from './weekly-meal/weekly-meal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('stripe.STRIPE_API_KEY'),
        options: {
          apiVersion: '2023-10-16',
        },
      }),
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    AdminModule,
    MailModule,
    MealTypeModule,
    RolesModule,
    MealGroupModule,
    CouponsModule,
    CouponsModule,
    AllergenModule,
    NutritionFactModule,
    MealKeywordModule,
    MealModule,
    PermissionsModule,
    SubscriptionModule,
    WeeklyMealModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

