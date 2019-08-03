package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

exports_files(
    [
        "tsconfig.json",
        "package.json",
        "tslib.package.json",
        "common.package.json",
    ],
    visibility = ["//visibility:public"],
)

nodejs_binary(
    name = "tslint",
    data = [
        "@npm//tslint",
    ],
    entry_point = "@npm//:node_modules/tslint/bin/tslint",
    install_source_map_support = False,
    templated_args = ["--node_options=--preserve-symlinks"],
)

load("@com_github_bazelbuild_buildtools//buildifier:def.bzl", "buildifier")

buildifier(
    name = "buildifier",
)

filegroup(
    name = "global-tsconfig",
    srcs = ["tsconfig.json"],
)
