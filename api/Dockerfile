FROM node:14.17-alpine3.14

RUN apk add --no-cache bash

COPY package.json /app/
RUN cd /app && yarn install --legacy-peer-deps

COPY . /app
WORKDIR /app

CMD yarn start:dev
