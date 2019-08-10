package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@ts_protoc_gen//:defs.bzl", "typescript_proto_library")

proto_library(
    name = "protos_lib",
    srcs = [
        "broker.proto",
        "comms.proto",
    ],
)

typescript_proto_library(
    name = "ts_protos",
    proto = ":protos_lib",
)

ts_library(
    name = "protos",
    srcs = glob([
        "**/*.ts",
    ]),
    module_name = "@dcl/protos",
    tsconfig = ":tsconfig.json",
    deps = [
        "//protos:ts_protos",
        "@npm//@bazel/typescript",
        "@npm//@types/node",
        "@npm//protobufjs",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    srcs = [
        "broker.proto",
        "comms.proto",
    ],
    package_layers = [
        "//:common.package.json",
        "protos.package.json",
    ],
    deps = [":protos"],
)

