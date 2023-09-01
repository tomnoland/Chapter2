#!/bin/bash
################################################################################

cd schemaspy

docker run \
	-v "./output:/output" \
	-v "./config:/config"  \
	schemaspy/schemaspy:6.2.4 \
		-configFile ./config/schemaspy.properties \
		-noimplied \
		-nopages \
		-l

open output/index.html