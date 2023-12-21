import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealGroupDto } from './dto';
import { MealGroup } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export default class MealGroupService {
  constructor(
    @InjectRepository(MealGroup)
    private readonly mealGroupRepository: Repository<MealGroup>,
  ) {}

  async createGroup(createMealTypeDto: CreateMealGroupDto) {
    const { group } = createMealTypeDto;
    const already = await this.findByGroup(group);

    if (already) {
      throw new ConflictException('Group already exist');
    }
    const newType: MealGroup = new MealGroup();
    newType.group = group;
    const response = await this.mealGroupRepository.save(newType);
    return {
      response,
      message: 'Meal Group created',
    };
  }

  async updateMealGroup(id: number, updateMealType: CreateMealGroupDto) {
    const { group } = updateMealType;
    const findType = await this.findGroup(id);
    if (!findType) {
      throw new NotFoundException('Group not found');
    }
    const already = await this.findByGroup(group);
    if (already) {
      throw new ConflictException('Group already exist');
    }
    findType.group = group;
    findType.id = id;
    const updatedType = await this.mealGroupRepository.save(findType);
    if (updatedType) {
      return {
        updatedType,
        message: 'Meal Group updated',
      };
    }
  }

  async removeGroup(id: number) {
    const findType = await this.findGroup(id);
    if (!findType) {
      throw new NotFoundException('Group not found');
    }
    const deletedType = await this.mealGroupRepository.delete(id);
    if (deletedType) {
      return {
        message: 'Group deleted',
      };
    }
  }

  async findGroup(id: number): Promise<MealGroup> {
    return this.mealGroupRepository.findOneBy({ id });
  }

  async findByGroup(identifier: string): Promise<MealGroup> {
    try {
      return this.mealGroupRepository.findOne({ where: { group: identifier } });
    } catch (error) {
      return error;
    }
  }

  findAllGroups(): Promise<MealGroup[]> {
    try {
      return this.mealGroupRepository.find();
    } catch (error) {
      return error;
    }
  }
}
