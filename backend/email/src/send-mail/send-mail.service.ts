import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RmqContext } from '@nestjs/microservices';
import { SendData } from './types';
import { RmqService } from '../libs/common/rmq/rmq.service';
import { configuration } from '../configuration/config';

@Injectable()
export class SendMailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly rmqService: RmqService
  ) {
  }

  async sendMail(data: SendData, ctx: RmqContext) {
    console.log(`Отправляю письмо ${data?.to}, текст: ${data?.text}${data.additionalText ? `, дополнительный текст: ${data.additionalText}` : ''}, шаблон ${data.template}`);
    let error: string;
    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: `./${data.template}`,
        context: {
          text: data.text,
          backendURL: configuration.BACKEND_URL,
          additionalText: data?.additionalText
        }
      });
      this.rmqService.ack(ctx);

      console.log(`Письмо успешно отправлено: ${data.to}`)

      return {
        message: 'Письмо успешно отправлено'
      }
    } catch (e) {
      console.log(`Ошибка во время отправления письма ${data.to}, ошибка: ${e}`);
      error = `Ошибка во время отправления письма ${data.to}`;
    }

    return {
      message: `Ошибка во время отправления письма`,
      error: error
    }
  }
}
