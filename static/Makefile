SHELL=/bin/bash

_base: clean all

clean:
	pushd less && make clean && popd
#	pushd js && make clean && popd

all:
	pushd less && make all && popd
	pushd js && make all && popd
