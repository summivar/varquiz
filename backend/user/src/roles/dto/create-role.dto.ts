import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Уникальное название роли" })
  @IsString({ message: "Должно быть строкой" })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @IsString({ message: "Должно быть строкой" })
  description: string;
}
