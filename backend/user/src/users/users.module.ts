import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UsersSchema } from "./schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { HelperService } from "../helper/services";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { configuration } from '../configuration';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "EMAIL_SERVICE",
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [configuration.RABBITMQ_URL],
            queue: "email_queue",
            queueOptions: {
              durable: false
            }
          }
        })
      }]),
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule)
  ],
  providers: [UsersService, HelperService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule {
}
