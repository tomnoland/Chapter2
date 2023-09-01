#!/bin/bash
################################################################################

cd db/schemaspy

docker run -v "./target:/output" -v "./config:/config"  schemaspy/schemaspy:latest -configFile /config/schemaspy.properties  -noimplied -nopages -l
