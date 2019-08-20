package(default_visibility = ["//visibility:public"])

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "dclamd",
    srcs = glob(
        include = ["*.ts"],
        exclude = [
            "test/**/*",
            "node_modules/**/*",
        ],
    ),
    module_name = "@dcl/amd",
    deps = [],
)

ts_library(
    name = "dclamd_test",
    testonly = 1,
    srcs = glob(
        include = ["test/*.ts"],
    ),
    deps = [
        ":dclamd",
        "@npm//@types/jasmine",
    ],
)

load("@npm_bazel_karma//:defs.bzl", "ts_web_test_suite")

ts_web_test_suite(
    name = "test_suite",
    browsers = [
        "@io_bazel_rules_webtesting//browsers:chromium-local",
    ],
    runtime_deps = [
        ":dclamd",
    ],
    deps = [
        ":dclamd_test",
        ":test/simple.spec.js",
        "@npm//jasmine",
    ],
)

jasmine_node_test(
    name = "test",
    srcs = [
        "test/simple.spec.js",
        ":dclamd",
    ],
    deps = [
        "@npm//jasmine",
    ],
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
