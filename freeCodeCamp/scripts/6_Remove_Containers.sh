#!/bin/bash
################################################################################

# REMOVE CONTAINERS:

docker stop chapter-mailhog-1 && docker rm chapter-mailhog-1
docker stop chapter-db-1 && docker rm chapter-db-1
docker stop chapter-server-1 && docker rm chapter-server-1
docker stop chapter-client-1 && docker rm chapter-client-1


################################################################################