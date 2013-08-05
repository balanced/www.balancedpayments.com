#!/usr/bin/env sh

npm install
git submodule update --init
make clean live
