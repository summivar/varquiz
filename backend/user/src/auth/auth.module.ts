import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { configuration } from '../configuration';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: configuration.PRIVATE_KEY || "PRIVATEjwtSTRONGKEY",
      signOptions: {
        expiresIn: configuration.EXPIRES_IN || "3d",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
