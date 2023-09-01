#!/bin/bash
################################################################################

cd ./freeCodeCamp/chapter

cp .env.example .env

sed -i '' 's/netcat/netcat-traditional/' server.Dockerfile

sed -i '' 's/debian-openssl-1.1.x/debian-openssl-3.0.x/' server/prisma/schema.prisma

npm install typescript

################################################################################