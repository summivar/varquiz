import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RmqService } from "./libs/common/rmq/rmq.service";

export const __DIRNAME_main = __dirname;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('email'));

  await app.startAllMicroservices().then(() => {
    console.log("Email service is working");
  });
}

bootstrap();
