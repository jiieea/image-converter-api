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
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  //   authorization logics
  async create(request: UserRegisterRequest): Promise<UserResponse> {
    this.logger.info('Creating user register');
    const registerReq = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );
    this.logger.info(`Data sent = ${registerReq.email}`);
    const existUser = await this.prismaService.user.count({
      where: { email: registerReq.email },
    });
    if (existUser != 0) {
      throw new HttpException(`Email already used`, HttpStatus.BAD_REQUEST);
    }
    this.logger.info(`sent data : ${registerReq.email}`);
    const saltRound = 10;
    registerReq.password = await bcrypt.hash(registerReq.password, saltRound);
    const user = await this.prismaService.user.create({
      data: {
        email: registerReq.email,
        password: registerReq.password,
      },
    });

    return {
      email: user.email,
    };
  }

  private async validateEmail(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException(`Invalid Credentials`, HttpStatus.NOT_FOUND);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new HttpException(` Wrong Password`, HttpStatus.BAD_REQUEST);
    }
    return {
      ...user,
    };
  }

  async login(request: UserLoginRequest): Promise<UserResponse> {
    this.logger.info('User Login');
    const loginReq = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );
    const user = await this.validateEmail(loginReq.email, loginReq.password);
    this.logger.info(`Credential: ${JSON.stringify(loginReq)}`);
    const payload = { sub: user.email, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    await this.prismaService.user.update({
      where: {
        email: loginReq.email,
      },
      data: {
        token: token,
      },
    });
    return {
      email: user.email,
      token,
    };
  }

  async logout(email: string): Promise<UserResponse> {
    this.logger.info('User Logout');
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
    }

    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        token: null,
      },
    });

    return {
      email: user.email,
    };
  }
}
