package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

filegroup(
    name = "sources",
    srcs = glob(
        include = [
            "src/**/*.ts",
            "src/**/*.css",
            "src/**/*.tsx",
            "src/**/*.json",
        ],
    ),
)

filegroup(
    name = "public",
    srcs = glob(
        include = [
            "public/**/*",
            "dist/**/*",
        ],
    ),
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "amd.package.json",
    ],
    deps = [":dclamd"],
)

nodejs_binary(
    name = "start",
    data = [
        # Data
        ":sources",
        ":public",
        ":tsconfig.json",
        # Other modules
        "//kernel",
        "//rpc",
        "//utils",
        "//config",
        "//protos",
        "//kernel:package",
        "//utils:package",
        "//rpc:package",
        "//config:package",
        "//protos:package",
        # App Dependencies
        "@npm//@babel/core",
        "@npm//@types/history",
        "@npm//@types/node",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-redux",
        "@npm//@types/react-router",
        "@npm//connected-react-router",
        "@npm//decentraland-ui",
        "@npm//history",
        "@npm//react",
        "@npm//react-console-emulator",
        "@npm//react-dom",
        "@npm//react-json-tree",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//redux",
        "@npm//typesafe-actions",
        "@npm//typescript",
        # Dev Dependencies
        "@npm//@types/events",
        "@npm//fuse-box",
        "@npm//postcss-import",
        "@npm//terser",
        "@npm//uglify-js",
    ],
    entry_point = ":start.js",
)
