package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

filegroup(
    name = "srcs",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = [
            "node_modules/**/*",
            "scene-runner/userSpace/**/*",
        ],
    ),
)

ts_library(
    name = "synced-ecs",
    srcs = glob(
        include = [
            "index.ts",
            "**/*.ts",
        ],
        exclude = [
            "scene-runner/userSpace/**/*",
            "**/*.spec.ts",
        ],
    ),
    module_name = "@dcl/synced-ecs",
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
    name = "synced-ecs-test",
    srcs = glob([
        "**/*.spec.ts",
    ]),
    deps = [
        ":synced-ecs",
        "@npm//@types/jasmine",
        "@npm//@types/node",
        "@npm//fp-future",
    ],
)

jasmine_node_test(
    name = "test",
    coverage = True,
    deps = [
        ":synced-ecs-test",
        "@npm//jasmine",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "synced-ecs.package.json",
    ],
    deps = [":synced-ecs"],
)
