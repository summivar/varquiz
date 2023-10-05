import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ShareStudysetDto {
  @ApiProperty({
    example: 'id',
    description: 'ID учебного модуля',
    required: true,
  })
  @IsString()
  studysetId: string;

  @ApiProperty({
    example: 'email',
    description: 'email пользователя, кому доступ раздаётся',
    required: true,
  })
  @IsString()
  @IsEmail()
  accessToEmail: string;
}