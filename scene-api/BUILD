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

filegroup(
    name = "extractor-filedeps",
    data = [
        "api-extractor.json",
        "tsconfig.json",
    ],
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
        ":scene-api",
    ],
)

nodejs_binary(
    name = "api_extractor",
    args = [
        "run",
        "--local",
        "--verbose",
        "--typescript-compiler-folder ../npm/node_modules/typescript",
        "-c scene-api/api-extractor.json",
    ],
    data = [
        ":extractor-filedeps",
        ":package",
        ":scene-api",
        "//utils",
        "@npm//@bazel/typescript",
        "@npm//@microsoft/api-extractor",
        "@npm//typescript",
    ],
    entry_point = "@npm//:node_modules/@microsoft/api-extractor/bin/api-extractor",
    visibility = ["//visibility:public"],
)
