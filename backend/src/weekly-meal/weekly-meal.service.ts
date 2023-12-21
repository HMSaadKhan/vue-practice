import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateWeekDto, CreateWeeklyMealDto, GetWeeklyMealDto } from './dto';
import { Week } from './entities';
import moment from 'moment';
import WeeklyMeal from './entities/weekly-meal.entity';
import { Meal } from 'src/meal/entities';

@Injectable()
export default class WeeklyMealService {
  constructor(
    @InjectRepository(Week) private readonly weekRepository: Repository<Week>,
    @InjectRepository(WeeklyMeal)
    private readonly weeklyMealRepository: Repository<WeeklyMeal>,
    @InjectRepository(Meal) private readonly mealRepository: Repository<Meal>,
  ) {}
  async createWeek(createWeekDto: CreateWeekDto): Promise<Week> {
    const { startDate, endDate } = createWeekDto;
    const createWeek = new Week();
    const start_date = moment(startDate, 'YYYY-MM-DD');
    const end_date = moment(endDate, 'YYYY-MM-DD');
    const dateInfo = this.getDateInfo(start_date, end_date);
    createWeek.startDate = startDate;
    createWeek.endDate = endDate;
    createWeek.week = dateInfo.week.toString();
    createWeek.month = dateInfo.month;
    createWeek.year = dateInfo.year;

    return this.weekRepository.save(createWeek);
  }

  getDateInfo(startDate: moment.Moment, endDate: moment.Moment) {
    if (!moment.isMoment(startDate) || !moment.isMoment(endDate)) {
      throw new ForbiddenException('Invalid date format!');
    }

    if (startDate.isAfter(endDate)) {
      throw new ForbiddenException('Start date cannot be after end date!');
    }
    const weekNumber = Math.ceil(startDate.date() / 7);
    const monthName = startDate.format('MMMM');
    const year = startDate.format('YYYY');
    return {
      week: weekNumber,
      month: monthName,
      year: year,
    };
  }

  async createWeeklyMeal(createWeeklyMealDto: CreateWeeklyMealDto) {
    const { startDate, endDate, meal } = createWeeklyMealDto;
    const alreadyWeek = await this.getWeeklyMeal({ date: startDate });
    if (alreadyWeek) throw new ForbiddenException('Week meals already exist');
    const createdWeek = await this.createWeek({ startDate, endDate });
    if (createdWeek) {
      const mealPromises = meal.map(async (item: any) => {
        const meal = await this.mealRepository.findOne({
          where: { id: item },
          relations: ['type'],
        });
        if (meal) {
          const weeklyMeal = new WeeklyMeal();
          weeklyMeal.week = createdWeek;
          weeklyMeal.meal = meal;
          weeklyMeal.meal_type_id = meal.type;

          return this.weeklyMealRepository.save(weeklyMeal);
        } else {
          throw new NotFoundException(`Nutrition ${meal} not exist`);
        }
      });

      const weeklyMeal = await Promise.all(mealPromises);
      if (!weeklyMeal) {
        throw new ForbiddenException('Weekly Meal not created');
      }
      return {
        message: 'Weekly meals created!',
      };
    }
  }

  async updateWeeklyMeal(id: number, updateWeeklyMealDto: CreateWeeklyMealDto) {
    const { meal } = updateWeeklyMealDto;
    const alreadyWeek = await this.weekRepository.findOneBy({id});
    if (!alreadyWeek) throw new ForbiddenException('Week meals not exist');
    if (alreadyWeek) {
      const mealPromises = meal.map(async (item: any) => {
        const meal = await this.mealRepository.findOne({
          where: { id: item },
          relations: ['type'],
        });
        if (meal) {
          const existingWeeklyMeal = await this.weeklyMealRepository.findOne({
            where: {
              meal: { id: meal.id },
              week: { id: alreadyWeek.id },
            },
          });
          if (existingWeeklyMeal) {
            existingWeeklyMeal.meal = meal;
            existingWeeklyMeal.meal_type_id = meal.type;
            await this.weeklyMealRepository.save(existingWeeklyMeal);
          } else throw new NotFoundException('Weekly meal not exist');

          return this.weeklyMealRepository.save(weeklyMeal);
        } else {
          throw new NotFoundException(`Meal not exist`);
        }
      });
      const weeklyMeal = await Promise.all(mealPromises);
      if (!weeklyMeal) {
        throw new ForbiddenException('Weekly Meal not updated');
      }
      return {
        message: 'Weekly meals updated!',
      };
    }
  }

  async getWeeklyMeal(getWeeklyMealDto: GetWeeklyMealDto) {
    const { date } = getWeeklyMealDto;
    const searchDate = moment(date, 'YYYY-MM-DD');
    const weekNumber = Math.ceil(searchDate.date() / 7).toString();
    const monthName = searchDate.format('MMMM');
    const year = searchDate.format('YYYY');
    console.log(searchDate, weekNumber, monthName, year);

    return this.weekRepository.findOne({
      where: {
        week: weekNumber,
        month: monthName,
        year,
      },
      relations: {
        weeklyMeal: { meal: true },
      },
    });
  }
}
