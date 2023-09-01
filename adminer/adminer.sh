#!/bin/zsh
################################################################################

cd adminer

docker run \
	--net=chapter_default \
	--link chapter-db-1:db \
	-p 8080:8080 \
	adminer:4 \
		- ADMINER_DESIGN=mancave &


# open "http://localhost:8080/?pgsql=db&username=postgres&db=chapter&ns=public"