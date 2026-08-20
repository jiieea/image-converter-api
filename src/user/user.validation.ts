import { z, ZodType } from 'zod';
import { UserLoginRequest, UserRegisterRequest } from './user.model';

export class UserValidation {
  static readonly REGISTER: ZodType<UserRegisterRequest> = z.object({
    email: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]{2,}$/, {
        message: 'Invalid Email Format.',
      }),
    password: z.string().regex(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/, {
      message: 'Password must contain special characters',
    }),
  });
  static readonly LOGIN: ZodType<UserLoginRequest> = z.object({
    email: z.string().min(1),
    password: z.string(),
  });
}
