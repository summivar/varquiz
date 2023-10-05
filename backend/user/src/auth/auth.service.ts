import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SignInUserDto, SignUpUserDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "../users/schemas";
import { Token } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    const candidate = await this.usersService.getUserByEmail(
      signUpUserDto.email
    );
    if (candidate) {
      throw new BadRequestException({
        message: "Пользователь с таким email уже существует",
      });
    }

    const hashPassword = await bcrypt.hash(signUpUserDto.password, 11);
    const user = await this.usersService.create({
      ...signUpUserDto,
      password: hashPassword,
    });

    const token = this.generateToken(user);
    const userRespnose = this.usersService.getResponseFromUser(user);

    return {
      token: token.token,
      user: userRespnose
    }
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.validateUser(signInUserDto);

    const token = this.generateToken(user);
    const userRespnose = this.usersService.getResponseFromUser(user);

    return {
      token: token.token,
      user: userRespnose
    }
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      roles: user.roles,
      isEmailConfirmed: user.isEmailActivated
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(signInUserDto: SignInUserDto) {
    const user = await this.usersService.getUserByEmail(signInUserDto.email);

    if (user) {
      const passwordEquals = await bcrypt.compare(
        signInUserDto.password,
        user?.password
      );

      if (passwordEquals) {
        return user;
      }

      throw new UnauthorizedException({
        message: "Некорректная почта или неверный пароль",
      });
    }

    throw new UnauthorizedException({
      message: "Не найден пользователь",
    });
  }
}
