NODE = @node
COMPILER = $(NODE) --max-old-space-size=4096 node_modules/.bin/decentraland-compiler
PARALLEL_COMPILER = node --max-old-space-size=4096 node_modules/.bin/decentraland-compiler

DCL_PROJECT=../scenes/test

CWD = $(shell pwd)

GREEN=\n\033[1;34m
RED=\n\033[1;31m
RESET=\033[0m

build: | compile
	@echo "$(GREEN)===================== Compilation Done =====================$(RESET)"

clean:
	@echo "$(GREEN)===================== Cleaning project =====================$(RESET)"
	$(COMPILER) build.clean.json

compile: | build-test-scenes generate-mocks compile-entry-points

compile-entry-points: | build-sdk
	@echo "$(GREEN)================== Compiling entry points ==================$(RESET)"
	$(COMPILER) build.entryPoints.json

compile-dev:
	NODE_ENV=development $(MAKE) compile

build-sdk: build-support
	@echo "$(GREEN)======================= Building SDK =======================$(RESET)"
	$(COMPILER) build.sdk.json
	cd $(PWD)/packages/decentraland-ecs; $(PWD)/node_modules/.bin/api-extractor run --typescript-compiler-folder "$(PWD)/node_modules/typescript" --local --verbose
	node ./scripts/buildEcsTypes.js
	@echo "$(GREEN)======================= Updating docs ======================$(RESET)"
	cd $(PWD)/packages/decentraland-ecs; $(PWD)/node_modules/.bin/api-documenter markdown -i types/dcl -o docs
	cd $(PWD)/packages/decentraland-ecs; $(PWD)/node_modules/.bin/api-documenter yaml -i types/dcl -o docs-yaml

SOURCE_SUPPORT_TS_FILES := $(wildcard scripts/*.ts)
COMPILED_SUPPORT_JS_FILES := $(subst .ts,.js,$(SOURCE_SUPPORT_TS_FILES))

scripts/%.js: $(SOURCE_SUPPORT_TS_FILES)
	npx tsc --build scripts/tsconfig.json

packages/build-ecs/%.js: packages/build-ecs/%.ts
	npx tsc --build packages/build-ecs/tsconfig.json

build-support: $(COMPILED_SUPPORT_JS_FILES) packages/build-ecs/index.js scripts/tsconfig.json packages/build-ecs/tsconfig.json
	@echo "$(GREEN)================== Support files built ==================$(RESET)"

ECS_CONFIG_DEPENDENCIES := packages/decentraland-ecs/package.json packages/decentraland-ecs/tsconfig.json
DECENTRALAND_ECS_SOURCES := $(wildcard packages/decentraland-ecs/src/**/*.ts)
DECENTRALAND_ECS_COMPILED_FILES := packages/decentraland-ecs/dist/src/index.js packages/decentraland-ecs/dist/index.d.ts
packages/decentraland-ecs/dist/src/index.js: $(DECENTRALAND_ECS_SOURCES) $(ECS_CONFIG_DEPENDENCIES)
	$(COMPILER) build.sdk.json

DECENTRALAND_ECS_TYPEDEF_FILE := packages/decentraland-ecs/types/dcl/index.d.ts
packages/decentraland-ecs/types/dcl/index.d.ts: $(COMPILED_SUPPORT_JS_FILES) $(DECENTRALAND_ECS_COMPILED_FILES) $(DECENTRALAND_ECS_SOURCES) $(ECS_CONFIG_DEPENDENCIES)
	cd $(PWD)/packages/decentraland-ecs; $(PWD)/node_modules/.bin/api-extractor run --typescript-compiler-folder "$(PWD)/node_modules/typescript" --local
	@node ./scripts/buildEcsTypes.js

HELLMAP_SOURCE_FILES := $(wildcard public/hell-map/*/game.ts)
HELLMAP_GAMEJS_FILES := $(subst .ts,.js,$(HELLMAP_SOURCE_FILES))

public/hell-map/%/game.js: public/hell-map/%/game.ts packages/decentraland-ecs/types/dcl/index.d.ts
	@echo "$(GREEN)===================== Building hell map ====================$(RESET)"
	$(COMPILER) build.hell-map.json

build-hell-map: $(HELLMAP_GAMEJS_FILES)

TEST_SCENES_SOURCE_FILES := $(wildcard public/test-scenes/*/game.ts)
TEST_SCENES_GAMEJS_FILES := $(subst .ts,.js,$(TEST_SCENES_SOURCE_FILES))

public/test-scenes/%/game.js: public/test-scenes/%/game.ts packages/decentraland-ecs/types/dcl/index.d.ts
	@echo "$(GREEN)===================== Building test scenes =================$(RESET)"
	$(COMPILER) build.test-scenes.json

build-test-scenes: $(TEST_SCENES_GAMEJS_FILES)

build-test-scenes: build-sdk
	@echo "$(GREEN)=================== Building test scenes ===================$(RESET)"
	$(COMPILER) build.test-scenes.json
	$(MAKE) build-hell-map
	node scripts/buildECSprojects.js

export-preview: | clean compile-entry-points
	@echo "$(GREEN)============== Exporting Preview File to CLI ===============$(RESET)"
	cp static/dist/preview.js ${DCL_PROJECT}/node_modules/decentraland-ecs/artifacts/

publish:
	@echo "$(GREEN)=================== getting release ready ==================$(RESET)"
	$(NODE) ./scripts/prepareDist.js

	@echo "$(GREEN)===================== decentraland-ecs =====================$(RESET)"
	@cd $(PWD)/packages/decentraland-ecs; node $(PWD)/scripts/npmPublish.js

	@echo "$(GREEN)======================== build-ecs =========================$(RESET)"
	@cd $(PWD)/packages/build-ecs; node $(PWD)/scripts/npmPublish.js

test: compile-dev
	@echo "$(GREEN)================= Running development tests ================$(RESET)"
	node scripts/runTestServer.js

test-docker:
	docker run \
		-it \
		--rm \
		--name node \
		-v "$(PWD):/usr/src/app" \
		-w /usr/src/app \
		-e SINGLE_RUN=true \
		circleci/node:10-browsers \
	 		node ./scripts/createMockJson.js
	docker run \
		-it \
		--rm \
		--name node \
		-v "$(PWD):/usr/src/app" \
		-w /usr/src/app \
		-e SINGLE_RUN=true \
		circleci/node:10-browsers \
	 		node ./scripts/runTestServer.js

test-ci:
	NODE_ENV=production $(MAKE) compile
	@echo "$(GREEN)================= Running production tests =================$(RESET)"
	SINGLE_RUN=true node ./scripts/runTestServer.js
	node_modules/.bin/nyc report --temp-directory ./test/tmp --reporter=html --reporter=lcov --reporter=text

generate-images-local: compile-dev
	@echo "$(GREEN)================== Generating test images ==================$(RESET)"
	node scripts/runTestServer.js

generate-images:
	docker run \
		-it \
		--rm \
		--name node \
		-v "$(PWD):/usr/src/app" \
		-w /usr/src/app \
		-e SINGLE_RUN=true \
		-e GENERATE_NEW_IMAGES=true \
		-p 8080:8080 \
		circleci/node:10-browsers \
			make generate-images-local
	$(MAKE) generate-mocks

generate-mocks: public/local-ipfs/mappings

PARCEL_SCENE_JSONS := $(wildcard public/test-scenes/*/scene.json)
ECS_SCENE_JSONS := $(wildcard public/ecs-parcels/*/scene.json)
HELLMAP_SCENE_JSONS := $(wildcard public/hell-map/*/scene.json)
SCENE_JSONS := $(PARCEL_SCENE_JSONS) $(ECS_SCENE_JSONS) $(HELLMAP_SCENE_JSONS)

public/local-ipfs/mappings: ./scripts/createMockJson.js $(SCENE_JSONS)
	$(NODE) ./scripts/createMockJson.js

lint:
	node_modules/.bin/madge packages/entryPoints/index.ts --circular --warning
	node_modules/.bin/madge packages --orphans --extensions ts --exclude '.+\.d.ts|.+/dist\/.+'
	node_modules/.bin/tslint --project tsconfig.json

lint-fix:
	node_modules/.bin/tslint --project tsconfig.json --fix
	node_modules/.bin/prettier --write 'packages/**/*.{ts,tsx}'
	node_modules/.bin/prettier --write 'packages/decentraland-ecs/types/dcl/index.d.ts'

watch: export NODE_ENV=development
watch: compile-dev
	@echo "$(GREEN)=================== Watching file changes ==================$(RESET)"
	$(MAKE) only-watch


FILE=-100.*
watch-single:
	@echo '[{"name": "Debug","kind": "Webpack","file": "public/test-scenes/$(FILE)/game.ts","target": "web"}]' > build.single-debug.json
	@node_modules/.bin/concurrently \
		-n "entryPoints,debug-scene,server" \
			"$(PARALLEL_COMPILER) build.entryPoints.json --watch" \
			"$(PARALLEL_COMPILER) build.single-debug.json --watch" \
			"node ./scripts/runTestServer.js --keep-open"

watch-single-no-server:
	@echo '[{"name": "Debug","kind": "Webpack","file": "public/test-scenes/$(FILE)/game.ts","target": "web"}]' > build.single-debug.json
	@node_modules/.bin/concurrently \
		-n "entryPoints,debug-scene" \
			"$(PARALLEL_COMPILER) build.entryPoints.json --watch" \
			"$(PARALLEL_COMPILER) build.single-debug.json --watch"

only-watch:
	@node_modules/.bin/concurrently \
		-n "sdk,test-scenes,entryPoints,ecs-builder,server" \
			"$(PARALLEL_COMPILER) build.sdk.json --watch" \
			"$(PARALLEL_COMPILER) build.test-scenes.json --watch" \
			"$(PARALLEL_COMPILER) build.entryPoints.json --watch" \
			"node ./scripts/buildECSprojects.js --watch" \
			"node ./scripts/runTestServer.js --keep-open"

# initializes a local dev environment to test the CLI with a linked version of decentraland-ecs
initialize-ecs-npm-link: build-sdk
	rm -rf packages/decentraland-ecs/artifacts || true
	mkdir packages/decentraland-ecs/artifacts
	ln -sf $(CWD)/node_modules/dcl-amd/dist/amd.js packages/decentraland-ecs/artifacts/amd.js
	ln -sf $(CWD)/packages/build-ecs/index.js packages/decentraland-ecs/artifacts/build-ecs.js
	ln -sf $(CWD)/static/dist/preview.js packages/decentraland-ecs/artifacts/preview.js
	ln -sf $(CWD)/static/dist/unityPreview.js packages/decentraland-ecs/artifacts/unityPreview.js
	ln -sf $(CWD)/static/dist/editor.js packages/decentraland-ecs/artifacts/editor.js
	ln -sf $(CWD)/static/preview.html packages/decentraland-ecs/artifacts/preview.html
	ln -sf $(CWD)/static/fonts packages/decentraland-ecs/artifacts/fonts
	ln -sf $(CWD)/static/images packages/decentraland-ecs/artifacts/images
	ln -sf $(CWD)/static/models packages/decentraland-ecs/artifacts/models
	ln -sf $(CWD)/static/unity packages/decentraland-ecs/artifacts/unity
	ln -sf $(CWD)/static/unity-preview.html packages/decentraland-ecs/artifacts/unity-preview.html
	cd packages/decentraland-ecs; npm link

dev-watch:
	@node_modules/.bin/concurrently \
		-n "sdk,entryPoints,server" \
			"$(PARALLEL_COMPILER) build.entryPoints.json --watch" \
			"node ./scripts/runTestServer.js --keep-open"
