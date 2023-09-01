#!/bin/bash
################################################################################

cd freeCodeCamp/chapter

sed -i '' 's/DB_PORT=54320/DB_PORT=5432/' freeCodeCamp/chapter/.env

npm run db:migrate:dev

npm run db:reset
