import { Controller } from '@nestjs/common';
import { ConfirmMailService } from './confirm-mail.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendData } from '../send-mail/types';

@Controller('confirmMail')
export class ConfirmMailController {
  constructor(private readonly confirmMailService: ConfirmMailService) {
  }

  @MessagePattern("sendMailConfirmation")
  async sendMail(@Payload() data: SendData, @Ctx() context: RmqContext) {
    return await this.confirmMailService.sendConfirmation(data, context);
  }
}
