import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleSuccess {
  @ApiProperty({
    example: "Успешно создано",
    description: "Сообщение о том, создалась ли роль",
  })
  message: string;
}

export class AddRoleSuccess {
  @ApiProperty({
    example: "Роль добавлена пользователю",
    description: "Сообщение о том, добавилась ли роль пользователю",
  })
  message: string;
}
