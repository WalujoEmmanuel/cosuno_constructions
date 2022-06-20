FROM node:14.17-alpine3.14

COPY ["website/package.json", "/app/"]

RUN cd /app && yarn install

COPY ["website", "app/"]

WORKDIR /app

CMD yarn start:dev