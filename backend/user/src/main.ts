import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeName } from "swagger-themes";
import { ValidationPipe } from "./pipes/validation.pipe";
import { configuration }  from './configuration';

async function start() {
  const PORT = configuration.PORT;
  const swaggerTheme = configuration.SWAGGER_THEME;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    allowedHeaders: '*',
    exposedHeaders: '*',
    optionsSuccessStatus: 204,
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle("API для VarQuiz")
    .setDescription("Документация RESTful API")
    .setVersion("0.0.1")
    .addTag("Viachaslau Lukashonak")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme("v3");
  const options = {
    explorer: true,
    customCss: theme.getBuffer(swaggerTheme as SwaggerThemeName),
  };
  SwaggerModule.setup("api", app, document, options);

  await app.listen(PORT).then(() => {
    console.log('User\'s backend is working');
  });
}

start();
