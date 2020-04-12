FROM node:lts-alpine
WORKDIR /app
ADD ./package.json ./
RUN yarn install
ADD . .
RUN yarn build:production
ENTRYPOINT [ "yarn", "serve"]
EXPOSE 5000
