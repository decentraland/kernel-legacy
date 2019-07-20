build: common client
	npm pack

.PHONY: common host client

common: lib/common
client: lib/client

lib/common: ./src/common/**/*.ts
	tsc -p ./src/tsconfig.json

lib/client: ./src/host/**.*.ts
	tsc -p ./src/client/tsconfig.json
