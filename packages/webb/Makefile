manual/dcl-client-0.0.0.tgz: ../client/dcl-client-0.0.0.tgz
	cp ../client/dcl-client-0.0.0.tgz manual/
	npm update ./manual/dcl-client-0.0.0.tgz

manual/dcl-utils-0.0.0.tgz: ../utils/dcl-utils-0.0.0.tgz
	cp ../utils/dcl-utils-0.0.0.tgz manual/
	npm update ./manual/dcl-utils-0.0.0.tgz

.PHONY: update-deps
update-deps: manual/dcl-utils-0.0.0.tgz manual/dcl-client-0.0.0.tgz

.PHONY: build
build: update-deps
	npm run build

.PHONY: watch
watch: update
	npm start

.PHONY: update-utils
update-utils: ../utils/dcl-utils-0.0.0.tgz
	cp ../utils/dcl-utils-0.0.0.tgz manual/dcl-utils-0.0.0.tgz
	cp node_modules/@dcl/utils/package.json node_modules/@dcl/utils/package.back 
	tar xzf manual/dcl-utils-0.0.0.tgz
	cp -r package/* node_modules/@dcl/utils/
	cp node_modules/@dcl/utils/package.back node_modules/@dcl/utils/package.lock 
	rm -rf package

.PHONY: update-client
update-client: ../client/dcl-client-0.0.0.tgz
	cp ../client/dcl-client-0.0.0.tgz manual/dcl-client-0.0.0.tgz
	cp node_modules/@dcl/client/package.json node_modules/@dcl/client/package.back 
	tar xzf manual/dcl-client-0.0.0.tgz
	cp -r package/* node_modules/@dcl/client/
	cp node_modules/@dcl/client/package.back node_modules/@dcl/client/package.lock 
	rm -rf package


update: update-utils update-client
	touch src/App.tsx
