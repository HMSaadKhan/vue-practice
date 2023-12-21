import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealTypeDto } from './dto';
import { MealType } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export default class MealTypeService {
  constructor(
    @InjectRepository(MealType)
    private readonly mealTypeRepository: Repository<MealType>,
  ) {}

  async createType(createMealTypeDto: CreateMealTypeDto) {
    const { type } = createMealTypeDto;
    try {
      const already = await this.findByType(type);

      if (already) {
        throw new ConflictException('Type already exist');
      }
      const newType: MealType = new MealType();
      newType.type = type;
      const response = await this.mealTypeRepository.save(newType);
      return {
        response,
        message: 'Meal Type created',
      };
    } catch (error) {
      return { error };
    }
  }

  async updateMealType(id: number, updateMealType: CreateMealTypeDto) {
    const { type } = updateMealType;
    try {
      const findType = await this.findType(id);
      if (!findType) {
        throw new NotFoundException('Type not found');
      }
      const already = await this.findByType(type);
      if (already) {
        throw new ConflictException('Type already exist');
      }
      findType.type = type;
      findType.id = id;
      const updatedType = await this.mealTypeRepository.save(findType);
      if (updatedType) {
        return {
          updatedType,
          message: 'Meal Type updated',
        };
      }
    } catch (error) {
      return { error };
    }
  }

  async removeType(id: number) {
    try {
      const findType = await this.findType(id);
      if (!findType) {
        throw new NotFoundException('Type not found');
      }
      const deletedType = await this.mealTypeRepository.delete(id);
      if (deletedType) {
        return {
          message: 'Type deleted',
        };
      }
    } catch (error) {
      return { error };
    }
  }

  async findType(id: number): Promise<MealType> {
    return this.mealTypeRepository.findOneBy({ id });
  }

  async findByType(identifier: string): Promise<MealType> {
    try {
      return this.mealTypeRepository.findOne({ where: { type: identifier } });
    } catch (error) {
      return error;
    }
  }

  findAllTypes(): Promise<MealType[]> {
    try {
      return this.mealTypeRepository.find();
    } catch (error) {
      return error;
    }
  }
}
