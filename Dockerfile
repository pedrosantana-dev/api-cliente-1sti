FROM node:14.18.0-alpine

WORKDIR /home/app

COPY package*.json .

RUN npm install

COPY . .

## COPY .env /home/app/.env

EXPOSE 3000

CMD npm run start:dev