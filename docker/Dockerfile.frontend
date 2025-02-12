FROM node:alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY apps/frontend apps/frontend

COPY apps/backend apps/backend

COPY packages/db packages/db

COPY packages/sdk packages/sdk

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm i

RUN npm run build --workspace=frontend

FROM base AS main

WORKDIR /app

COPY --from=build /app/apps/frontend/.next/standalone ./

EXPOSE 3000

CMD [ "node", "server.js" ]

