import { IsString } from 'class-validator';

export class AuthDto {

  @IsString()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}
