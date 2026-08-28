import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { CreateUserDto } from '../../users/dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const userObject = savedUser.toObject() as any;
    delete userObject.password;

    return userObject;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    const userObject = user.toObject() as any;
    delete userObject.password;

    return {
      user: userObject,
      accessToken,
    };
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.userModel.findById(payload.userId).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userObject = user.toObject() as any;
    delete userObject.password;

    return userObject;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}