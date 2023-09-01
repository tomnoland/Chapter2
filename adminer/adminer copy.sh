#!/bin/bash
################################################################################

cd admire

docker run \
	-p 8080:8080 \
	-n chapter
	adminer:4 \
      		- ADMINER_DESIGN=mancave

open ./index.html