import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteStudysetDto {
  @ApiProperty({
    example: "id",
    description: "ID учебного модуля",
    required: true,
  })
  @IsString()
  studysetId: string;
}
