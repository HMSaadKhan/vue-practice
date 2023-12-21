import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../users/entities/users.entity';
import Admin from '../admin/entities/admin.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { Role } from 'src/roles/entities';
import { MealType } from 'src/meal-type/entities';
import { MealGroup } from 'src/meal-group/entities';
import Coupons from 'src/coupons/entities/coupons.entity';
import { Allergen } from 'src/allergen/entities';
import { NutritionFact } from 'src/nutrition-fact/entities';
import { Keyword } from 'src/meal-keyword/entities';
import { Meal, MealAllergen, MealKey, MealNutrition } from 'src/meal/entities';
import { Permission } from 'src/permissions/entities';
import { Week } from 'src/weekly-meal/entities';
import WeeklyMeal from 'src/weekly-meal/entities/weekly-meal.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize:true,
        logging: configService.get<boolean>('database.logging') || true,
        // synchronize: configService.get<boolean>('database.synchronize'),
        entities: [
          Users,
          Admin,
          Role,
          MealType,
          MealNutrition,
          MealGroup,
          Allergen,
          NutritionFact,
          Keyword,
          Meal,
          Coupons,
          Permission,
          Week,
          WeeklyMeal
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}




