package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = [
            "node_modules/**/*",
            "scenes/exposedApis/**/*",
            "scenes/runner/**/*",
        ],
    ),
)

ts_library(
    name = "kernel",
    srcs = glob(
        include = [
            "index.ts",
            "auth/**/*.ts",
            "assets/**/*.ts",
            "comms/**/*.ts",
            "loader/**/*.ts",
            "config/**/*.ts",
            "main/**/*.ts",
            "passports/**/*.ts",
            "presence/**/*.ts",
            "scenes/**/*.ts",
            "social/**/*.ts",
            "worldMap/**/*.ts",
        ],
        exclude = [
            "**/*.spec.ts",
        ],
    ),
    module_name = "@dcl/kernel",
    deps = [
        "//config",
        "//protos",
        "//rpc",
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

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "kernel_spec",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":kernel",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//fp-future",
    ],
)

jasmine_node_test(
    name = "test",
    deps = [
        ":kernel_spec",
        "@npm//jasmine",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "kernel.package.json",
    ],
    deps = [":kernel"],
)
