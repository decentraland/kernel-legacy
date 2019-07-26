package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "rpc/host",
    srcs = glob(["**/*.ts"]),
    module_name = "@dcl/rpc/host",
    deps = [
        "//rpc/common",
        "@npm//@types",
    ],
)