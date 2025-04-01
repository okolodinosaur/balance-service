import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { DeductBalanceDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('deduct-balance')
  async deductBalance(@Body() deductData: DeductBalanceDto) {
    const { amount, userId } = deductData;
    try {
      const result = await this.usersService.deductBalance(userId, amount);

      return result;
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }
}
