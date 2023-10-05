import * as dotenv from 'dotenv';
import * as path from 'path';

export const NODE_ENV = process.env.NODE_ENV;

dotenv.config({
  path: path.join(`.${NODE_ENV}.env`)
})

export const configuration = {
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  BACKEND_URL: process.env.BACKEND_URL
};
