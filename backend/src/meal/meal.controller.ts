import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Put,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import MealService from './meal.service';
import { CreateMealDto, UpdateMealDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/file-uploads/file-uploads.dest';

@Controller('meal')
export default class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: '.(png|jpeg|jpg)',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
    @Body() createMealDto: CreateMealDto,
    
    ) {
    return this.mealService.createMeal(createMealDto, image.filename);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  update(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.mealService.updateMeal(+id, updateMealDto, image?.filename);
  }

  @Get()
  findAll(@Request() req: Request) {
    const host = req.headers['host'];
    return this.mealService.findAllMeal(host);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: Request,) {
    const host = req.headers['host'];
    return this.mealService.findOne(+id, host);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.mealService.deleteMeal(+id);
  }
 
}
