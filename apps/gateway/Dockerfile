FROM node:18
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build:gateway

CMD ["node", "dist/apps/gateway/src/main.js"]