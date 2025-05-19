FROM node:18
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build:event

CMD ["node", "dist/apps/event/src/main.js"]