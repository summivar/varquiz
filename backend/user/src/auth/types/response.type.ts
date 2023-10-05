import { ApiProperty } from "@nestjs/swagger";

export class Token {
  @ApiProperty({
    example: "token",
    description: "Авторизационный токен пользователя",
  })
  token: string;
}