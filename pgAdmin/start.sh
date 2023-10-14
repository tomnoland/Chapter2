#!/bin/bash
################################################################################

cd pgAdmin

docker run \
	-p 5555:80 \
	--name pgadmin \
	-v /Users/tomn/Chapter2/pgAdmin/pgadmin-data:/var/lib/pgadmin/storage/ \
	--env PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org \
	-e PGADMIN_DEFAULT_PASSWORD=admin \
	dpage/pgadmin4:7.6 \
	&

# open ../index.html