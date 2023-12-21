import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import UserSubscriptionService from './subscription.service';
  import { CreateUserSubscriptionDto, UpdateUserSubscriptionDto } from './dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
  
  @Controller('subscription')
  export default class SubscriptionController {
    constructor(private readonly subscriptionService: UserSubscriptionService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() CreateSubscriptionDto: CreateUserSubscriptionDto, @Req() req: any) {
      console.log(req, 'request')
      return this.subscriptionService.createSubscription(CreateSubscriptionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllCustomers(@Req() req: any) {
      console.log(req.user, 'requestttttttttttttttt')
      return this.subscriptionService.getAllSubscriptions()
    }
  
  
  }
  
