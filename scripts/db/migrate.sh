#!/bin/bash
################################################################################

cd ./db/prisma

npx prisma migrate dev --name init

npx run prisma seed

