#!/bin/bash
################################################################################

git clone https://github.com/freeCodeCamp/chapter.git

./setup.sh

cd chapter

docker-compose up&

sleep 30

../migrate.sh

cd ..

# open -a "Google Chrome" file:///Users/tomn/chapter_extras/index.html
