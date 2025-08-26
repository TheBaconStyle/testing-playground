# Fullstack Node.JS template project

---

## Description

This is basic template project for fullstack nodejs development with docker.

---

## Contents

- Requirements
- Quick start

---

## Requirements

- Docker
- Node.JS (or Deno by preference)

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
