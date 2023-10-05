import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class SignUpUserDto {
  @ApiProperty({ example: "user@gmail.com", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Невалидная почта" })
  email: string;

  @IsString({ message: "Должно быть строкой" })
  @Length(8, 32, { message: "Не менее 8 и не более 32 символов" })
  @ApiProperty({ example: "12345678", description: "Пароль пользователя" })
  password: string;
}
