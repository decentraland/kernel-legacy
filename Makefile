.PHONY: install-deps all configure build run watch webb

all: build

webb:
	cd packages/webb && make build

packages/%/package-lock.json:
	cd packages/$@ && npm install

install-deps:
	cd packages/config && make
	cd packages/rpc && make
	cd packages/utils && make
	cd packages/client && make

configure:
	# Make sure we have stuff and write config files
build: install-deps webb
	# Do more things to build the thing
run:
	# Yey things run!
watch:
	# Watch the things in build and notify the things of run
