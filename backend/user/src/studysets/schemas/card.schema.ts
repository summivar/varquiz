import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type CardDocument = Card & Document;

@Schema({
  timestamps: true,
})
export class Card {
  @ApiProperty({ example: "Слово", description: "Термин карточки" })
  @Prop({ required: true })
  term: string;

  @ApiProperty({ example: "Описание слово", description: "Описание карточки" })
  @Prop({ required: true })
  definition: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
