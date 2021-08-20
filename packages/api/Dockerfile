FROM node:14-alpine
ENV NODE_ENV production

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/api ./packages/api

RUN yarn workspace @desmoslive/api install --production=true

WORKDIR /app/packages/api
EXPOSE 5000
CMD yarn start
