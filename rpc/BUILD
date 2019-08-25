package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "rpc",
    srcs = glob(["**/*.ts"]),
    module_name = "@dcl/rpc",
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
        "rpc.package.json",
    ],
    deps = [
        ":rpc",
    ],
)
