import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  // REGISTER
  @Post('register')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async register(
    @Body() createUserDto: CreateUserDto,
    @Response() res: any,
  ) {
    const user = await this.authService.register(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  // LOGIN
  @Post('login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async login(
    @Body() loginDto: LoginDto,
    @Response() res: any,
  ) {
    const { user, accessToken } =
      await this.authService.login(loginDto);

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const cookieOptions: any = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie('token', accessToken, cookieOptions);

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  // LOGOUT
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req: any,
    @Response() res: any,
  ) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });

    return res.json({
      message: 'Logout successful',
    });
  }

  // CURRENT USER
    @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: any) {
    const userId = req.user.userId;

    const user = await this.usersService.findOne(userId);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}