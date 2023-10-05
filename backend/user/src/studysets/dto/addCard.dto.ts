import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddCardDto {
  @ApiProperty({
    example: "ID",
    description: "ID учебного модуля",
    required: true,
  })
  @IsString()
  studysetId: string;

  @ApiProperty({
    example: "Apple",
    description: "Термин",
    required: true,
  })
  @IsString()
  term: string;

  @ApiProperty({
    example: "Яблоко",
    description: "Описание термина",
    required: true,
  })
  @IsString()
  definition: string;
}
