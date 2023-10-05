FROM node:19.5.0-alpine

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY ./* ./

CMD ["npm", "run", "start:no-host-check"]
