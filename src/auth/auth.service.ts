import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
} from '../user/user.model';
import { ValidationService } from '../validation/validation.service';
import { UserValidation } from '../user/user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  //   authorization logics

  async create(request: UserRegisterRequest): Promise<UserResponse> {
    const registerReq = this.validationService.validation(
      UserValidation.REGISTER,
      request,
    );
    const saltRound = 10;
    registerReq.password = await bcrypt.hash(registerReq.password, saltRound);
    const user = await this.prismaService.user.create({
      data: {
        username: registerReq.username,
        password: registerReq.password,
      },
    });

    return {
      username: user.username,
    };
  }

  async login(request: UserLoginRequest): Promise<UserResponse> {
    const userReq = this.validationService.validation(
      UserValidation.LOGIN,
      request,
    );
    const existingUser = await this.prismaService.user.count({
      where: {
        username: request.username,
      },
    });

    if (existingUser != 0) {
      throw new HttpException('Username already exists', HttpStatus.NOT_FOUND);
    }
  }
}
