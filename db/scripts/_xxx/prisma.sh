#!/bin/bash
################################################################################

cd db/prisma

npx prisma migrate dev --name init
