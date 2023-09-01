#!/bin/bash
################################################################################

cd ./db/prisma

npx prisma migrate dev --name init

cd ../..


cd freeCodeCamp/chapter

sed -i '' 's/DB_PORT=54320/DB_PORT=5432/' .env


npm run db:reset

sed -i '' 's/DB_PORT=5432/DB_PORT=54320/' .env

cd ../..
