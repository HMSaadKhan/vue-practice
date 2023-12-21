import {
    Injectable,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreateKeywordDto, UpdateKeywordDto } from './dto';
  import { Keyword } from './entities';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export default class MealKeywordService {
    constructor(
      @InjectRepository(Keyword)
      private readonly mealKeywordRepository: Repository<Keyword>,
    ) {}
  
    async createMealKey(createMealTypeDto: CreateKeywordDto) {
      const { key_name } = createMealTypeDto;
      const already = await this.findByKey(key_name);

      if (already) {
        throw new ConflictException('Keyword already exist');
      }
      const newKey: Keyword = new Keyword();
      newKey.key_name = key_name;
      const response = await this.mealKeywordRepository.save(newKey);
      return {
        response,
        message: 'Meal Keyword created',
      };
    }
  
    async updateMealKeyword(id: number, updateMealType: CreateKeywordDto) {
      const { key_name, status } = updateMealType;
      const findType = await this.findKey(id);
      if (!findType) {
        throw new NotFoundException('Keyword not found');
      }
      const already = await this.findByKey(key_name);
      if (already) {
        throw new ConflictException('Keyword already exist');
      }
      findType.key_name = key_name;
      findType.status = status;
      findType.id = id;
      const updatedKey = await this.mealKeywordRepository.save(findType);
      if (updatedKey) {
        return {
          updatedKey,
          message: 'Meal Keyword updated',
        };
      }
    }
  
    async removeKeyword(id: number) {
        const findType = await this.findKey(id);
        if (!findType) {
          throw new NotFoundException('Keyword not found');
        }
        const deletedType = await this.mealKeywordRepository.delete(id);
        if (deletedType) {
          return {
            message: 'Keyword deleted',
          };
        }
    }
  
    async findKey(id: number): Promise<Keyword> {
      return this.mealKeywordRepository.findOneBy({ id });
    }
  
    async findByKey(identifier: string): Promise<Keyword> {
      try {
        return this.mealKeywordRepository.findOne({ where: { key_name: identifier } });
      } catch (error) {
        return error;
      }
    }

    async findOne(id: number): Promise<Keyword> {
      const key= await this.mealKeywordRepository.findOne({
        where: { id: id },
      });
      if(!key)
        throw new NotFoundException('Key not found');
      return key;
    }
  
    findAllKeywords(): Promise<Keyword[]> {
      try {
        return this.mealKeywordRepository.find();
      } catch (error) {
        return error;
      }
    }
  }
  
