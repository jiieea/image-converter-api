import { z, ZodType } from 'zod';
import { UserLoginRequest, UserRegisterRequest } from './user.model';

export class UserValidation {
  static readonly REGISTER: ZodType<UserRegisterRequest> = z.object({
    username: z
      .string()
      .min(1)
      .regex(/^[A-Z].*$/, {
        message: 'Username must be start with uppercase letter',
      }),
    password: z.string().regex(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/, {
      message: 'Password must contain special characters',
    }),
  });
  static readonly LOGIN: ZodType<UserLoginRequest> = z.object({
    username: z
      .string()
      .min(1)
      .regex(/^[A-Z].*$/, {
        message: 'Username must be start with uppercase letter',
      }),
    password: z.string().regex(/^(?=.*[0-9]).+$/, {
      message: 'Password must contain special characters',
    }),
  });
}
