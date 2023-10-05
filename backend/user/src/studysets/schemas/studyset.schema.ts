import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type StudysetDocument = Studyset & Document;

@Schema({
  timestamps: true,
})
export class Studyset {
  @ApiProperty({
    example: 'Польский язык',
    description: 'Заголовок учебного модуля',
  })
  @Prop({required: true})
  title: string;

  @ApiProperty({
    example: 'Польские фрукты',
    description: 'Описание учебного модуля',
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: 'Карточки учебного модуля',
    description: 'Карточки учебного модуля',
  })
  @Prop()
  cards: ObjectId[];

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Почтовый адрес создателя',
  })
  @Prop({required: true})
  createdBy: string;

  @ApiProperty({
    example: 'email',
    description: 'email тех, кто имеет доступ к studyset',
  })
  @Prop()
  accessTo: string[];
}

export const StudysetSchema = SchemaFactory.createForClass(Studyset);
