import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { User } from '../helper/decorators';
import { UpdateUserDto } from './dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Получение данных о пользователе из запроса'})
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('getuser')
  async getUser(@User() user) {
    const email: string = user?.email;
    return await this.usersService.getUserDataByEmail(email);
  }

  @ApiOperation({summary: 'Изменение данных о пользователе'})
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('edituser')
  async editUserData(@User() user, @Body() updateUserDto: UpdateUserDto) {
    const email: string = user?.email;
    return await this.usersService.updateUserDataByEmail(email, updateUserDto);
  }

  @ApiOperation({summary: 'Подтверждение почты пользователем'})
  @Get('confirmmail/:activationLink')
  async confirmMail(@Param('activationLink') activationLink: string) {
    return await this.usersService.confirmMail(activationLink);
  }
}
