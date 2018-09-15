FROM node:8.12.0-alpine
WORKDIR /usr/app
COPY ["./mock-api/package.json", "./mock-api/yarn.lock", "./"]
RUN yarn
COPY ["./mock-api/generateApiData.js", "./mock-api/scripts.js", "./mock-api/constants.js", "./"]
RUN npm run db
EXPOSE 8080
CMD yarn serve:docker