import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Уникальное название роли" })
  @IsString({ message: "Должно быть строкой" })
  readonly value: string;

  @ApiProperty({
    example: "64bb1c3a9d48f76ecfe498c5",
    description: "Уникальное Id пользователя",
  })
  @IsString({ message: "Должно быть строкой" })
  readonly userId: string;
}
