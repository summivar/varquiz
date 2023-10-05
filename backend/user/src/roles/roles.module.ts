import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RolesSchema } from "./schemas";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  exports: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RolesSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
