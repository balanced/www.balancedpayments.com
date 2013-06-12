#!/bin/bash

LIST=`git submodule | awk '{ print $2 }'`
BASE=`pwd`

for name in $LIST
do
	#echo "test $name"
	echo "updating $name"
	cd "$name" && git pull && cd "$BASE"
done
