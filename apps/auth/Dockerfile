FROM node:18
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build:auth

CMD ["node", "dist/apps/auth/src/main.js"]