manual/dcl-client-0.0.0.tgz: ../client/dcl-client-0.0.0.tgz
	cp ../client/dcl-client-0.0.0.tgz manual/
	npm install ./manual/dcl-client-0.0.0.tgz

manual/dcl-utils-0.0.0.tgz: ../utils/dcl-utils-0.0.0.tgz
	cp ../utils/dcl-utils-0.0.0.tgz manual/
	npm install ./manual/dcl-utils-0.0.0.tgz

.PHONY: update-deps
update-deps: manual/dcl-utils-0.0.0.tgz manual/dcl-client-0.0.0.tgz

.PHONY: build
build: update-deps
	npm run build

.PHONY: watch
watch: update-deps
	npm start
