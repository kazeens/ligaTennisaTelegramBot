FROM node:12.14-alpine
ARG APP_DIR=/usr/src/app
WORKDIR $APP_DIR
RUN apk update && \
    apk add python git build-base bash --no-cache
COPY package*.json ./
RUN npm install
COPY . .
