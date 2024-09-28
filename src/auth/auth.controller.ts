import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { buildResponse } from 'src/helpers/response';
import { UserServices } from 'src/user/user.service';
import { CreateUserDto } from './dtos/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthControllers {
  constructor(
    private userService: UserServices,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async Login(@Body() createUserDto: CreateUserDto) {
    try {
      const usernameToLowerCase: string =
        createUserDto.username.toLocaleLowerCase();

      const users =
        await this.userService.getUserByUsername(usernameToLowerCase);

      if (!users) {
        return buildResponse(
          false,
          'Invalid username or password',
          null,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isComparePassword = await bcrypt.compare(
        createUserDto.password,
        users.password,
      );

      if (!isComparePassword) {
        return buildResponse(
          false,
          'Invalid username or password',
          null,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        username: users.username,
        userId: users.id,
      };
      const token = await this.jwtService.signAsync(payload);

      return buildResponse(
        true,
        'Login  successfully',
        {
          username: users.username,
          token: token,
        },
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        buildResponse(
          false,
          'Internal server error',
          error.message,
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
