FROM node:8.12.0-alpine
WORKDIR /usr/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY ./dist-message-filter/ .
CMD ["yarn", "serve:docker"]