.PHONY: common host client build

all: build

build: common client
	npm pack

common: lib/common
client: lib/client

lib/common: ./src/common/**/*.ts
	tsc -p ./src/tsconfig.json

lib/client: ./src/host/**.*.ts

src/host/%.ts:
	tsc -p ./src/client/tsconfig.json
