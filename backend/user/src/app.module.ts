import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { StudysetsModule } from "./studysets/studysets.module";
import { configuration } from './configuration';

@Module({
  imports: [
    MongooseModule.forRoot(configuration.MONGODB_URL),
    AuthModule,
    UsersModule,
    RolesModule,
    StudysetsModule,
  ],
})
export class AppModule {}
