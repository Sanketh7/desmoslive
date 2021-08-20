FROM node:14-alpine as build
ENV NODE_ENV production

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/web ./packages/web

RUN yarn workspace @desmoslive/web install --production=true

WORKDIR /app/packages/web
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/packages/web/build /usr/share/nginx/html
EXPOSE 80
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]