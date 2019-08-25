package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "scene-api",
    srcs = glob(
        include = [
            "ecs/*.ts",
            "engine/*.ts",
            "lib/*.ts",
            "schema/*.ts",
            "index.ts",
        ],
        exclude = [
            "extract.ts",
            "init.ts",
        ],
    ),
    module_name = "@dcl/scene-api",
    deps = [
        "//rpc",
        "//utils",
        "@npm//@types/node",
        "@npm//devtools-protocol",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "scene-api.package.json",
    ],
    deps = [
        ":scene-api",
    ],
)
