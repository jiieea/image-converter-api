export class UserRegisterRequest {
  email: string;
  password: string;
}

export class UserLoginRequest {
  email: string;
  password: string;
}

export class UserResponse {
  email: string;
  token?: string;
}
