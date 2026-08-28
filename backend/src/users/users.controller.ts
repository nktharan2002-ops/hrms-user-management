import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.response) {
        throw error;
      }

      throw new HttpException('Internal server error', 500);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error.response) {
        throw error;
      }

      throw new HttpException('Internal server error', 500);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    try {
      const requestingUserId = req.user?.userId;

      return await this.usersService.update(
        id,
        updateUserDto,
        requestingUserId,
      );
    } catch (error) {
      if (error.response) {
        throw error;
      }

      throw new HttpException('Internal server error', 500);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    try {
      const requestingUserId = req.user?.userId;

      return await this.usersService.remove(
        id,
        requestingUserId,
      );
    } catch (error) {
      if (error.response) {
        throw error;
      }

      throw new HttpException('Internal server error', 500);
    }
  }
}