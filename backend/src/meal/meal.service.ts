import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealDto, UpdateMealDto } from './dto';
import { Meal, MealAllergen, MealKey, MealNutrition } from './entities';
import { In, Repository } from 'typeorm';
import { MealGroup } from 'src/meal-group/entities';
import { MealType } from 'src/meal-type/entities';
import { Keyword } from 'src/meal-keyword/entities';
import { NutritionFact } from 'src/nutrition-fact/entities';
import { Allergen } from 'src/allergen/entities';

@Injectable()
export default class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(MealGroup)
    private readonly mealGroupRepository: Repository<MealGroup>,
    @InjectRepository(MealType)
    private readonly mealTypeRepository: Repository<MealType>,
    @InjectRepository(MealNutrition)
    private readonly mealNutritionRepository: Repository<MealNutrition>,
    @InjectRepository(Keyword)
    private readonly mealKeywordRepository: Repository<Keyword>,
    @InjectRepository(NutritionFact)
    private readonly nutritionFactRepository: Repository<NutritionFact>,
    @InjectRepository(Allergen)
    private readonly allergenRepository: Repository<Allergen>,
  ) {}

  async createMeal(createMealDto: CreateMealDto, imageName: string) {
    const {
      name,
      product_detail,
      listing_page,
      price,
      group,
      type,
      allergens,
      keywords,
      tailor_meal,
      serving,
      instructions,
      features,
      ingredients,
      nutrition_facts,
    } = createMealDto;

    let allergenArr = [];
    let keywordsArr = [];
    if (typeof allergens === 'string') {
      allergenArr = allergens.split(',');
    } else {
      allergenArr = allergens;
    }
    if (typeof keywords === 'string') {
      keywordsArr = keywords.split(',');
    } else {
      keywordsArr = keywords;
    }

    const meal = new Meal();
    const [mealType, mealGroup, mealAllergens, mealKeywords] =
      await Promise.all([
        this.mealTypeRepository.findOne({ where: { id: type } }),
        this.mealGroupRepository.findOne({ where: { id: group } }),
        this.allergenRepository.find({ where: { id: In(allergenArr) } }),
        this.mealKeywordRepository.find({ where: { id: In(keywordsArr) } }),
      ]);

    meal.name = name;
    meal.product_detail = product_detail;
    meal.listing_page = listing_page;
    meal.group = mealGroup;
    meal.type = mealType;
    meal.image = imageName;
    meal.tailor_meal = tailor_meal;
    meal.keywords = mealKeywords;
    meal.allergens = mealAllergens;
    meal.serving = serving;
    meal.instructions = instructions;
    meal.features = features;
    meal.ingredients = ingredients;
    meal.price = price;

    const mealSave = await this.mealRepository.save(meal);
    if (!mealSave) {
      throw new ForbiddenException('Meal not created');
    }

    const nutritionFactsPromises = Object.entries(nutrition_facts).map(
      async ([nutrition_name, value]) => {
        const nutritionFact = await this.nutritionFactRepository.findOne({
          where: { nutrition_name },
        });
        if (nutritionFact) {
          const mealNutrition = new MealNutrition();
          mealNutrition.meal = mealSave;
          mealNutrition.nutrition = nutritionFact;
          mealNutrition.value = value;

          return this.mealNutritionRepository.save(mealNutrition);
        } else {
          throw new NotFoundException(`Nutrition ${nutrition_name} not exist`);
        }
      },
    );

    const mealNutrition = await Promise.all(nutritionFactsPromises);
    if (!mealNutrition) {
      throw new ForbiddenException('Meal not created');
    }
    return meal;
  }

  async updateMeal(
    mealId: number,
    updateMealDto: UpdateMealDto,
    updatedImageName?: string,
  ) {
    const {
      name,
      product_detail,
      listing_page,
      price,
      group,
      type,
      allergens,
      keywords,
      tailor_meal,
      serving,
      instructions,
      features,
      ingredients,
      nutrition_facts,
    } = updateMealDto;

    if (!mealId) throw new ForbiddenException(`Meal is undefined or not given`);

    const existingMeal = await this.mealRepository.findOne({
      where: {
        id: mealId,
      },
      relations: ['group', 'type', 'allergens', 'keywords', 'nutrition'],
    });

    if (!existingMeal) {
      throw new NotFoundException(`Meal with ${mealId} not found`);
    }

    let allergensArr = [];
    if (!allergens) {
      allergensArr = [];
    } else if (typeof allergens === 'string') {
      allergensArr = allergens.split(',');
    } else {
      allergensArr = allergens;
    }
    let keywordsArr = [];
    if (!keywords) {
      keywordsArr = [];
    } else if (typeof keywords === 'string') {
      keywordsArr = keywords.split(',');
    } else {
      keywordsArr = keywords;
    }
    const [mealType, mealGroup, mealAllergens, mealKeywords] =
      await Promise.all([
        this.mealTypeRepository.findOne({ where: { id: type } }),
        this.mealGroupRepository.findOne({ where: { id: group } }),
        this.allergenRepository.find({ where: { id: In(allergensArr) } }),
        this.mealKeywordRepository.find({ where: { id: In(keywordsArr) } }),
      ]);


    existingMeal.name = name;
    existingMeal.product_detail = product_detail;
    existingMeal.listing_page = listing_page;
    existingMeal.group = mealGroup;
    existingMeal.type = mealType;
    existingMeal.tailor_meal = tailor_meal;
    existingMeal.keywords = mealKeywords;
    existingMeal.allergens = mealAllergens;
    existingMeal.serving = serving;
    existingMeal.instructions = instructions;
    existingMeal.features = features;
    existingMeal.ingredients = ingredients;
    existingMeal.price = price;
    existingMeal.image = updatedImageName;

    // if (updatedImageName) {
    //   existingMeal.image = updatedImageName;
    // }
    const updatedMeal = await this.mealRepository.save(existingMeal);

    if (nutrition_facts) {
      const nutritionFactsPromises = Object.entries(nutrition_facts).map(
        async ([nutrition_name, value]) => {
          const nutritionFact = await this.nutritionFactRepository.findOne({
            where: { nutrition_name },
          });

          if (nutritionFact) {
            const existingMealNutrition =
              await this.mealNutritionRepository.findOne({
                where: {
                  meal: { id: existingMeal.id },
                  nutrition: { id: nutritionFact.id },
                },
              });
            if (existingMealNutrition) {
              existingMealNutrition.value = value;
              await this.mealNutritionRepository.save(existingMealNutrition);
            } else {
              const newMealNutrition = new MealNutrition();
              newMealNutrition.meal = updatedMeal;
              newMealNutrition.nutrition = nutritionFact;
              newMealNutrition.value = value;

              await this.mealNutritionRepository.save(newMealNutrition);
            }
          } else {
            throw new ForbiddenException('Meal nutrition not created');
          }
        },
      );
      await Promise.all(nutritionFactsPromises);
    }
    return {
      message: 'Meal updated',
    };
  }

  async findOne(id: number, host: string): Promise<Meal> {
    if (!id) throw new ForbiddenException(`Meal is undefined or not given`);
    const meal = await this.mealRepository.findOne({
      where: {
        id: id,
      },
      relations: ['type', 'group', 'allergens', 'keywords'],
    });
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    const nutrition_facts = await this.mealNutritionRepository.find({
      relations: ['nutrition'],
      where: {
        meal: { id: meal.id },
      },
    });
    meal.nutrition = nutrition_facts;
    var url = process.env.SERVER_PROTOCOL + '://' + host;
    const imageUrl = url + '/' + meal.image;
    meal.image = imageUrl;
    return meal;
  }

  async deleteMeal(id: number) {
    if (!id) throw new ForbiddenException(`Meal is undefined or not given`);
    const meal = await this.mealRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    const deleteNutritionAssociation =
      await this.mealNutritionRepository.delete({
        meal: { id: meal.id },
      });
    const deleteMeal = await this.mealRepository.remove(meal);
    if (deleteNutritionAssociation && deleteMeal) {
      return 'Meal deleted';
    }
  }

  async findAllMeal(host: string) {
    try {
      const meals = await this.mealRepository.find({
        relations: ['type', 'group', 'allergens', 'keywords'],
      });

      await Promise.all(
        meals.map(async (item) => {
          const nutrition = await this.mealNutritionRepository.find({
            relations: ['nutrition'],
            where: {
              meal: { id: item.id },
            },
          });
          var url = process.env.SERVER_PROTOCOL + '://' + host;
          const imageUrl = url + '/' + item.image;
          item.image = imageUrl;
          item.nutrition = nutrition;
        }),
      );

      return meals;
    } catch (error) {
      return error;
    }
  }
}
