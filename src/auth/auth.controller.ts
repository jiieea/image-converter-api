import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterRequest } from '../user/user.model';
import { AuthFilter } from './auth.filter';

@UseFilters(AuthFilter)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() request: UserRegisterRequest) {
    const data = await this.authService.create(request);
    return {
      data,
      message: 'User Created Successfully',
    };
  }
}
