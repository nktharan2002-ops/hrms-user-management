import { Injectable, Inject, forwardRef, UnauthorizedException, ForbiddenException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const email = createUserDto.email.toLowerCase();
    
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const userObject = savedUser.toObject() as any;
    if (userObject.hasOwnProperty('password')) {
      delete userObject.password;
    }
    return userObject;
  }

  async findAll(): Promise<any[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => {
      const userObject = user.toObject() as any;
      if (userObject.hasOwnProperty('password')) {
        delete userObject.password;
      }
      return userObject;
    });
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userObject = user.toObject() as any;
    if (userObject.hasOwnProperty('password')) {
      delete userObject.password;
    }
    return userObject;
  }

  async update(id: string, updateUserDto: UpdateUserDto, requestingUserId?: string): Promise<any> {
      if (requestingUserId && id !== requestingUserId) {
        throw new ForbiddenException('Forbidden: You can only update your own account');
      }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const email = updateUserDto.email ? updateUserDto.email.toLowerCase() : user.email;
    
    const existingUser = await this.userModel.findOne({ email, _id: { $ne: id } }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const updateData: any = { ...updateUserDto };
    if (updateUserDto.email) {
      updateData.email = email;
    }

    // Hash password if provided
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
      
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    
    const userObject = updatedUser.toObject() as any;
    if (userObject.hasOwnProperty('password')) {
      delete userObject.password;
    }
    return userObject;
  }

  async remove(id: string, requestingUserId?: string): Promise<any> {
      if (requestingUserId && id !== requestingUserId) {
        throw new ForbiddenException('Forbidden: You can only delete your own account');
      }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.findByIdAndDelete(id).exec();
    return {
      message: 'User deleted successfully',
      id,
    };
  }
}