import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteCardDto {
  @ApiProperty({
    example: "id",
    description: "ID карточки",
    required: true,
  })
  @IsString()
  cardId: string;

  @ApiProperty({
    example: "id",
    description: "ID карточки",
    required: true,
  })
  @IsString()
  studysetId: string;
}
