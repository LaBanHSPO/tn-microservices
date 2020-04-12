FROM node:lts-alpine
WORKDIR /app
ADD ./package.json ./
RUN yarn install
ADD . .
RUN yarn build
ENTRYPOINT [ "yarn", "start"]
