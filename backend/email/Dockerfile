FROM node:19.5.0-alpine

WORKDIR /emailservice

COPY ./package*.json ./

RUN npm install

COPY ./* ./

CMD ["npm", "run", "start:dev"]