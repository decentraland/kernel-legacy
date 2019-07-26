package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "client",
    srcs = glob(["**/*.ts"]),
    module_name = "@dcl/rpc/client",
    deps = [
        "//rpc/common",
        "@npm//@types",
    ],
)