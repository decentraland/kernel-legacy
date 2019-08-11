package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "scene-api",
    srcs = glob([
        "**/*.ts",
        "index.ts",
    ]),
    deps = [
        "//rpc/host",
        "//utils",
        "@npm//@types/node",
        "@npm//devtools-protocol",
    ],
)

nodejs_binary(
    name = "api_extractor",
    data = [
        ":lib",
        "@npm//@bazel/typescript",
        "@npm//@microsoft/api-extractor",
    ],
    entry_point = ":index.ts",
    visibility = ["//visibility:public"],
)

filegroup(
    name = "package_assets",
    srcs = ["BUILD"],
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
        ":lib",
    ],
)
