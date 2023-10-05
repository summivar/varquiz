import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type RolesDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({ example: "ADMIN", description: "Уникальное название роли" })
  @Prop({ required: true, unique: true })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Prop({ required: true })
  description: string;
}

export const RolesSchema = SchemaFactory.createForClass(Role);
