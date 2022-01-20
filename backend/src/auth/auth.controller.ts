import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnprocessableEntityException,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthDto, LoginDto } from './dto/auth.dto';

import { AuthService } from './auth.service';
import { ALREADY_REGISTER_ERROR } from './auth.constants';

interface ILoginResult {
  readonly success: boolean;
  readonly token: boolean;
}


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() dto: AuthDto) {

    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new UnprocessableEntityException(ALREADY_REGISTER_ERROR);
    }
    return this.authService.createUser(dto);

  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    console.log(email + ' ' + password);
    const userId = await this.authService.validateUser(email, password);

    return this.authService.login(userId);
  }
}
