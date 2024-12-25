# Fullstack Node.JS template project

---

## Description

This is basic template project for fullstack nodejs development with docker.

---

## Contents

- Requirements
- Environment vars
- Quick start

---

## Requirements

- Docker
- Node.JS (by preference)

---

## Environment vars

### For db package:

DB_HOST - host address of your db server

DB_PORT - port of your db server

DB_NAME - name of your db

DB_SCHEMA - your db schema name

DB_USER - your db user

DB_PASSWORD - your db password

### For backend:

All variables from db package

and

Other env variables by your preference

### For frontend:

All variables from db package

and

API_URL - url where your backend is accessed

AUTH_SECRET - next-auth environment variable for secret key to encrypt tokens

AUTH_DISCORD_ID - discord app id for next-auth

AUTH_DISCORD_SECRET - discord app secret for next-auth

AUTH_TRUST_HOST - next-auth env variable for 3rd party auth providers

AUTH_URL - next-auth env variable for callback after 3rdparty auth is done

and

Other env variables by your preference

---

## Quick start

---

To get started with this project you have to install nodejs dependencies, set env variables, run two services from dev.compose file: "postgres" and "mail" and apply migrations to database:

```
npm i

docker compose -f dev.compose.yaml up postgres

docker compose -f dev.compose.yaml up mail

npx drizzle-kit migrate

mpm run dev
```
