import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    example: "new-password (no-required)",
    description: "Имя пользователя (необязательный)",
    required: false,
  })
  password?: string;
}
