import { Injectable } from "@nestjs/common";
import { SendData } from '../send-mail/types';
import { RmqContext } from '@nestjs/microservices';
import { SendMailService } from '../send-mail/send-mail.service';

@Injectable()
export class ConfirmMailService {
  constructor(private readonly sendMailService: SendMailService) {
  }

  async sendConfirmation(data: SendData, context: RmqContext) {
    return this.sendMailService.sendMail(data, context);
  }
}
