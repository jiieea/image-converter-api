import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequest, UserRegisterRequest } from '../user/user.model';
import { AuthFilter } from './auth.filter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@UseFilters(AuthFilter)
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() request: UserRegisterRequest) {
    const data = await this.authService.create(request);
    return {
      data,
      message: 'User Created Successfully',
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: UserLoginRequest) {
    this.logger.info('Login Endpoint run...');
    this.logger.info('JWT_SECRET:', process.env.JWT_SECRET);
    const user = await this.authService.login(request);
    return {
      user,
      message: 'Login Successfully',
    };
  }
}
