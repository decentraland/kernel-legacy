.PHONY: clean update deps

build: deps update
	npm pack

clean:
	rm -rf dist

dist/%.js: src/%.ts
	tsc

manual/dcl-config-0.0.0.tgz: ../config/dcl-config-0.0.0.tgz

update-ts: dist/*.js package.json package-lock.json manual

deps: manual/dcl-config-0.0.0.tgz
	update-manual config
