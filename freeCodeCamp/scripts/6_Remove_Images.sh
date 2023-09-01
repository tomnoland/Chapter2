#!/bin/bash
################################################################################

# CLEAN IMAGES:

docker rmi -f postgres:14
docker rmi -f chapter-server:latest
docker rmi -f chapter-client:latest
docker rmi -f mailhog/mailhog:latest

################################################################################