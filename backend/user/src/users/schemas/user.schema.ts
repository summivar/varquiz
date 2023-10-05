import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";

export type UsersDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({ example: "user@gmail.com", description: "Почтовый адрес" })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: "12345678", description: "Пароль пользователя" })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: "true", description: "Активирована ли почта пользователя" })
  @Prop({ required: true, default: false })
  isEmailActivated: boolean;

  @ApiProperty({ example: "uuid", description: "Активирочная ссылка пользователя" })
  @Prop({ required: true })
  activationLink: string;

  @ApiProperty({ example: "[]", description: "Список учебных модулей" })
  @Prop({ default: [] })
  studysets: ObjectId[];

  @ApiProperty({ example: false, description: "Забанен ли пользователь" })
  @Prop({ default: false })
  banned: boolean;

  @ApiProperty({
    example: "Оскорбление родных",
    description: "Причина блокировки пользователя",
  })
  @Prop({ default: "" })
  banReason: string;

  @ApiProperty({ example: "ADMIN, USER", description: "Роли пользователя" })
  @Prop([{ type: String, ref: "Role" }])
  roles: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
