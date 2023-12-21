import {
    Injectable,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreateAllergenDto, UpdateAllergenDto } from './dto';
  import { Allergen } from './entities';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export default class AllergenService {
    constructor(
      @InjectRepository(Allergen)
      private readonly allergyRepository: Repository<Allergen>,
    ) {}
  
    async createAllergy(createAllergenDto: CreateAllergenDto) {
      const { allergy_name } = createAllergenDto;
      const already = await this.findByAllergy(allergy_name);

      if (already) {
        throw new ConflictException('Allergy already exist');
      }
      const newType: Allergen = new Allergen();
      newType.allergy_name = allergy_name;
      const response = await this.allergyRepository.save(newType);
      return {
        response,
        message: 'Meal Allergy created',
      };
    }
  
    async updateAllergy(id: number, updateMealType: UpdateAllergenDto) {
      const { allergy_name, status } = updateMealType;
      const findAllergy = await this.findAllergy(id);
      if (!findAllergy) {
        throw new NotFoundException('Allergy not found');
      }
      const already = await this.findByAllergy(allergy_name);
      if (already) {
        throw new ConflictException('Allergy already exist');
      }
      findAllergy.status = status;
      findAllergy.allergy_name = allergy_name;
      findAllergy.id = id;
      const updatedType = await this.allergyRepository.save(findAllergy);
      if (updatedType) {
        return {
          updatedType,
          message: 'Meal Allergy updated',
        };
      }
    }
  
    async removeAllergy(id: number) {
        const findType = await this.findAllergy(id);
        if (!findType) {
          throw new NotFoundException('Allergy not found');
        }
        const deletedType = await this.allergyRepository.delete(id);
        if (deletedType) {
          return {
            message: 'Allergy deleted',
          };
        }
    }
  
    async findAllergy(id: number): Promise<Allergen> {
      return this.allergyRepository.findOneBy({ id });
    }
  
    async findByAllergy(identifier: string): Promise<Allergen> {
      try {
        return this.allergyRepository.findOne({ where: { allergy_name: identifier } });
      } catch (error) {
        return error;
      }
    }

    async findAllergyById(id: number): Promise<Allergen> {
      const allergy= await this.allergyRepository.findOne({
        where: { id: id },
      });
      if(!allergy)
        throw new NotFoundException('Allergy not exist');
      return allergy;
    }
  
    findAllAllergen(): Promise<Allergen[]> {
      try {
        return this.allergyRepository.find();
      } catch (error) {
        return error;
      }
    }
  }
  
