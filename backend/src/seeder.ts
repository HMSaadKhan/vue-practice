import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from './admin/entities/admin.entity';
import { AdminSeed } from './database/seeders/admin.seeder';
import { Role } from './roles/entities';
import { Allergen } from './allergen/entities';
import { AllergenSeed } from './database/seeders/allergen.seeder';
import { MealGroup } from './meal-group/entities';
import { MealGroupSeed } from './database/seeders/meal-group.seeder';
import { Meal, MealNutrition } from './meal/entities';
import { MealType } from './meal-type/entities';
import { NutritionFact } from './nutrition-fact/entities';
import { Keyword } from './meal-keyword/entities';
import { MealTypeSeed } from './database/seeders/meal-type.seeder';
import { KeywordSeed } from './database/seeders/keyword.seeder';
import { RoleSeed } from './database/seeders/role.seeder';
import { NutritionFactSeed } from './database/seeders/nutrition-fact.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { Permission } from './permissions/entities';
import { PermissionSeed } from './database/seeders/permissions.seeder';

seeder({
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
        synchronize: false,
        logging: false,
        entities: [
          Admin,
          Role,
          Keyword,
          Allergen,
          NutritionFact,
          MealNutrition,
          MealType,
          Meal,
          MealGroup,
          Permission
        ],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Keyword,
      NutritionFact,
      MealNutrition,
      Allergen,
      MealType,
      Meal,
      Admin,
      Role,
      MealGroup,
      Permission
    ]),
  ],

}).run([
  PermissionSeed,
  RoleSeed,
  AdminSeed,
  MealGroupSeed,
  AllergenSeed,
  MealTypeSeed,
  KeywordSeed,
  NutritionFactSeed,
]);
