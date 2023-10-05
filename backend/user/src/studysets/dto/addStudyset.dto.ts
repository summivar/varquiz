import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddStudysetDto {
  @ApiProperty({
    example: "Польские фрукты",
    description: "Имя учебного модуля",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "Польские фрукты",
    description: "Описание учебного модуля",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
