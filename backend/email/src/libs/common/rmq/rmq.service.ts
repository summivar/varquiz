import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { configuration } from '../../../configuration/config';

@Injectable()
export class RmqService {
  constructor() {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [configuration.RABBITMQ_URL],
        queue: `${queue}_queue`,
        noAck,
        persistent: true,
        queueOptions: {
          durable: false
        },
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}