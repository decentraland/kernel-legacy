package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["node_modules/**/*"],
    ),
)

ts_library(
    name = "utils",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@dcl/utils",
    tsconfig = "//:global-tsconfig",
    deps = [
        "@npm//@types",
        "@npm//fp-future",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "utils_spec",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":utils",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//fp-future",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":utils_spec",
        "@npm//jasmine",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "utils.package.json",
    ],
    deps = [
        ":utils",
        "@npm//fp-future",
    ],
)
