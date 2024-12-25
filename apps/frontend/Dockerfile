FROM node:alpine3.20 AS base

FROM base AS build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build --workspace=frontend

FROM base AS main

WORKDIR /app

COPY --from=build /app/apps/frontend/.next/standalone/apps/frontend .
COPY --from=build /app/apps/frontend/.next/standalone/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "server.js" ]

