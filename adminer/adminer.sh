#!/bin/zsh
################################################################################

cd adminer

docker run \
	--net=chapter_default \
	--link chapter-db-1:db \
	--name adminer-4 \
	-p 8080:8080 \
	--env ADMINER_DESIGN=mancave \
	adminer:4 \
	&



# open "http://localhost:8080/?pgsql=db&username=postgres&db=chapter&ns=public"