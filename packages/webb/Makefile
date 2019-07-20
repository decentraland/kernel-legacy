.PHONY: watch
watch: update-deps
	npm start

.PHONY: build
build: update-deps
	npm run build

manual/dcl-client-0.0.0.tgz: ../client/dcl-client-0.0.0.tgz
	update-manual client

manual/dcl-utils-0.0.0.tgz: ../utils/dcl-utils-0.0.0.tgz
	update-manual utils

manual/dcl-config-0.0.0.tgz: ../config/dcl-config-0.0.0.tgz
	update-manual config

.PHONY: update-deps
update-deps: package-lock.json manual/dcl-utils-0.0.0.tgz manual/dcl-config-0.0.0.tgz manual/dcl-client-0.0.0.tgz

package-lock.json: package.json
	npm install
