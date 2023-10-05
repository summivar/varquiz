import { Module } from '@nestjs/common';
import { ConfirmMailService } from './confirm-mail.service';
import { ConfirmMailController } from './confirm-mail.controller';
import { SendMailModule } from '../send-mail/send-mail.module';

@Module({
  imports: [SendMailModule],
  providers: [ConfirmMailService],
  controllers: [ConfirmMailController],
})
export class ConfirmMailModule {}
