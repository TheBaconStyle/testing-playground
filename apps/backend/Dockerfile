FROM node:alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build --workspace=backend

FROM base AS main

WORKDIR /app

COPY --from=build /app/apps/backend/dist/server.js .

EXPOSE 5000

CMD ["node", "server.js"]