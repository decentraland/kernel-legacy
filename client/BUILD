package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "client",
    srcs = glob([
        "index.ts",
        "auth/**/*.ts",
        "assets/**/*.ts",
        "comms/**/*.ts",
        "config/**/*.ts",
        "main/**/*.ts",
        "passports/**/*.ts",
        "presence/**/*.ts",
        "social/**/*.ts",
        "worldMap/**/*.ts",
    ]),
    module_name = "@dcl/client",
    deps = [
        "//config",
        "//protos",
        "//rpc/client",
        "//rpc/host",
        "//scene-api",
        "//utils",
        "@npm//@types",
        "@npm//@types/auth0-js",
        "@npm//@types/events",
        "@npm//auth0-js",
        "@npm//decentraland-auth-protocol",
        "@npm//devtools-protocol",
        "@npm//fp-future",
        "@npm//google-protobuf",
        "@npm//webrtc-adapter",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "client.package.json",
    ],
    deps = [":client"],
)
