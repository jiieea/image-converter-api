export class UserRegisterRequest {
  username: string;
  password: string;
}

export class UserLoginRequest {
  username: string;
  password: string;
}

export class UserResponse {
  username: string;
  token?: string;
}
