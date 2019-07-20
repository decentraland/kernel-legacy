MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: first
first: build

.PHONY: build first clean install update-utils

build: install
	tsc
	npm pack

clean:
	rm dcl-client-0.0.0.tgz
	rm -rf dist

manual/dcl-utils-0.0.0.tgz : ../utils/dcl-utils-0.0.0.tgz
	update-manual utils

manual/dcl-config-0.0.0.tgz : ../config/dcl-config-0.0.0.tgz
	update-manual config

package-lock.json: package.json
	npm install

install: manual/dcl-utils-0.0.0.tgz manual/dcl-config-0.0.0.tgz package-lock.json
