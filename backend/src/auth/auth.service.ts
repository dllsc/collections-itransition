import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../../db/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { UserModel } from './user.model';


export interface IToken {
  accessToken: string;
  userId: number;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
  }

  async createUser(dto: AuthDto) {

    const user = UserEntity.create();
    user.email = dto.email;
    user.fullName = dto.fullName;
    user.passwordHash = await hash(dto.password, 10);
    return UserEntity.save(user);
  }

  async findUser(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async validateUser(email: string, password: string): Promise<number> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return user.id;
  }

  async login(id: number): Promise<IToken> {
    const payload = { id };
    const result = await this.jwtService.signAsync(payload);

    return {
      accessToken: result,
      userId: id,
    };
  }
}


