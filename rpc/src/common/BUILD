package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "rpc/common",
    srcs = glob(["**/*.ts"]),
    module_name = "@dcl/rpc/common",
    deps = [
        "@npm//@types",
    ],
)