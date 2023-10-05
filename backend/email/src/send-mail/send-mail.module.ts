import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RmqModule } from '../libs/common/rmq/rmq.module';
import { __DIRNAME_main } from '../main';
import { configuration } from '../configuration/config';

console.log(`Run app with host: ${configuration.SMTP_HOST}, SMTP user: ${configuration.SMTP_USER}, SMTP pass: ${configuration.SMTP_PASSWORD}`);

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: configuration.SMTP_HOST,
          auth: {
            user: configuration.SMTP_USER,
            pass: configuration.SMTP_PASSWORD
          }
        },
        template: {
          dir: join(__DIRNAME_main, '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    }),
    RmqModule
  ],
  providers: [SendMailService],
  exports: [SendMailService]
})
export class SendMailModule {
}
