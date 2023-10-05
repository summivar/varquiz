import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditStudysetDto {
  @ApiProperty({
    example: "id",
    description: "ID учебного модуля",
    required: true,
  })
  @IsString()
  studysetId: string;

  @ApiProperty({
    example: "Польские фрукты",
    description: "Заголовок учебного модуля",
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: "Польские фрукты",
    description: "Описание учебного модуля",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
