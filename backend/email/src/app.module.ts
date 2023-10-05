import { Module } from '@nestjs/common';
import { ConfirmMailModule } from './confirm-mail/confirm-mail.module';
import { SendMailModule } from "./send-mail/send-mail.module";

@Module({
  imports: [
    ConfirmMailModule,
    SendMailModule,
  ],
})
export class AppModule {}
