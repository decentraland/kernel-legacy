package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "common",
    srcs = glob(["**/*.ts"]),
    module_name = "@dcl/rpc-common",
    deps = [
        "@npm//@types",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "rpc-common.package.json",
    ],
    deps = [
        ":common",
    ],
)
