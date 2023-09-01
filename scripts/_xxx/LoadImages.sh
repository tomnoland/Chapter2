#!/bin/bash
################################################################################

FOLDER=\
../chapter_extras 

cd $FOLDER

docker load --input postgres_14.tar.gz

docker load --input adminer_4.tar.gz

docker load --input schemaspy_6_2_4.tar.gz
