.PHONY: watch
watch: update-deps
	node start.js

update-deps: package-lock.json external/config.tgz external/utils.tgz external/protos.tgz external/client.tgz 
	npm install ./external/*

package-lock.json: package.json
	npm install

external/%.tgz: ../bazel-bin/%/package.tgz
	mkdir -p external
	mv -f ../bazel-bin/$*/package.tgz external/$*.tar.gz

../bazel-bin/%/package.tgz:
	cd .. && bazel build //$*:package_tar

