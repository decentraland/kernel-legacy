MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: build
# clean install update-utils

clean:
	rm dcl-client-0.0.0.tgz
	rm -rf dist

manual/dcl-utils-0.0.0.tgz: ../utils/dcl-utils-0.0.0.tgz
	cp ../utils/dcl-utils-0.0.0.tgz manual/

update-utils: manual/dcl-utils-0.0.0.tgz
	npm install ./manual/dcl-utils-0.0.0.tgz

install: manual/dcl-utils-0.0.0.tgz
	npm install
	npm install ./manual/dcl-utils-0.0.0.tgz

package-lock.json: package.json
	npm install

build: manual/dcl-utils-0.0.0.tgz package-lock.json
	tsc
	npm pack
