import {
    Injectable,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreateNutritionFactDto, UpdateNutritionFactDto } from './dto';
  import { NutritionFact } from './entities';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export default class NutritionFactService {
    constructor(
      @InjectRepository(NutritionFact)
      private readonly nutritionFactRepository: Repository<NutritionFact>,
    ) {}
  
    async createGroup(createNutritionFactDto: CreateNutritionFactDto) {
      const { nutrition_name,unit } = createNutritionFactDto;
      const already = await this.findByNutritionName(nutrition_name);

      if (already) {
        throw new ConflictException('Nutrition Fact already exist');
      }
      const newNutrition: NutritionFact = new NutritionFact();
      newNutrition.nutrition_name = nutrition_name;
      newNutrition.unit = unit;
      const response = await this.nutritionFactRepository.save(newNutrition);
      return {
        response,
        message: 'Nutrition Fact created',
      };
    }
  
    async updateNutritionFact(id: number, updateNutritionFact: UpdateNutritionFactDto) {
      const { nutrition_name, unit } = updateNutritionFact;
      const nutritionFact = await this.findNutritionFact(id);
      if (!nutritionFact) {
        throw new NotFoundException('Nutrition Fact not found');
      }
      nutritionFact.nutrition_name = nutrition_name;
      nutritionFact.unit = unit;
      nutritionFact.id = id;
      const updatedType = await this.nutritionFactRepository.save(nutritionFact);
      if (updatedType) {
        return {
          updatedType,
          message: 'Meal Nutrition Fact updated',
        };
      }
    }
  
    async removeGroup(id: number) {
      const nutritionFact = await this.findNutritionFact(id);
      if (!nutritionFact) {
        throw new NotFoundException('Nutrition Fact not found');
      }
      const deletedFact = await this.nutritionFactRepository.delete(id);
      if (deletedFact) {
        return {
          message: 'Nutrition Fact deleted',
        };
      }
    }
  
    async findNutritionFact(id: number): Promise<NutritionFact> {
      return this.nutritionFactRepository.findOneBy({ id });
    }
  
    async findByNutritionName(identifier: string): Promise<NutritionFact> {
      try {
        return this.nutritionFactRepository.findOne({ where: { nutrition_name: identifier } });
      } catch (error) {
        return error;
      }
    }
  
    findAllFacts(): Promise<NutritionFact[]> {
      try {
        return this.nutritionFactRepository.find();
      } catch (error) {
        return error;
      }
    }
  }
  
