################################################################################

CLEAN ALL DOCKER RESOURCES:

docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
docker rmi -f $(docker images -a -q)
docker volume rm $(docker volume ls -q)
docker network rm $(docker network ls -q)

################################################################################

rm -rf chapter/
