package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "utils",
    srcs = glob(["**/*.ts"]),
    tsconfig = "//:global-tsconfig",
    module_name = "@dcl/utils",
    deps = [
        "//config",
        "@npm//@types",
        "@npm//fp-future",
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
    deps = [":utils"],
)
