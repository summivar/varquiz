import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditCardDto {
  @ApiProperty({
    example: "id",
    description: "ID учебного модуля",
    required: true,
  })
  @IsString()
  studysetId: string;

  @ApiProperty({
    example: "id",
    description: "ID карточки",
    required: true,
  })
  @IsString()
  cardId: string;

  @ApiProperty({
    example: "Apple",
    description: "Термин",
  })
  @IsString()
  @IsOptional()
  term?: string;

  @ApiProperty({
    example: "Яблоко",
    description: "Описание термина",
  })
  @IsString()
  @IsOptional()
  definition?: string;
}
