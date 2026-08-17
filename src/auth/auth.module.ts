import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../validation/validation.service';

@Module({
  providers: [AuthService, PrismaService, ValidationService],
  controllers: [AuthController],
})
export class AuthModule {}
