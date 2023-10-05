import * as dotenv from 'dotenv';
import * as path from 'path';

export const NODE_ENV = process.env.NODE_ENV;

dotenv.config({
  path: path.join(`.${NODE_ENV}.env`)
});

export const configuration = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  SWAGGER_THEME: process.env.SWAGGER_THEME,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};