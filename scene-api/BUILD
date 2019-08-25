package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = [
            "**/*.ts",
            "index.ts",
        ],
        exclude = [
            "extract.ts",
        ],
    ),
)

ts_library(
    name = "scene-api",
    srcs = glob(
        include = [
            "**/*.ts",
            "index.ts",
        ],
        exclude = [
            "extract.ts",
        ],
    ),
    tsconfig = ":tsconfig.json",
    deps = [
        "//rpc",
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

ts_library(
    name = "extract-lib",
    srcs = [
        "extract.ts",
    ],
    tsconfig = "//:tsconfig.json",
    deps = [
        "@npm//@bazel/typescript",
        "@npm//@microsoft/api-extractor",
        "@npm//@types/node",
        "@npm//typescript",
    ],
)

nodejs_binary(
    name = "extract",
    args = [
        "scene-api/tsconfig.json",
        "scene-api/index.d.ts",
    ],
    data = [
        ":extract-lib",
        ":extractor-filedeps",
        ":package.json",
        ":scene-api",
        "//rpc",
        "//utils",
        "@npm//@bazel/typescript",
        "@npm//@microsoft/api-extractor",
        "@npm//typescript",
    ],
    entry_point = ":extract.ts",
    visibility = ["//visibility:public"],
)
