import { Module } from "@nestjs/common";
import { StudysetsService } from "./studysets.service";
import { StudysetsController } from "./studysets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema, Studyset, StudysetSchema } from "./schemas";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { HelperService } from "../helper/services";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Studyset.name, schema: StudysetSchema }]),
    AuthModule,
    UsersModule
  ],
  providers: [StudysetsService, HelperService],
  controllers: [StudysetsController],
})
export class StudysetsModule {}
