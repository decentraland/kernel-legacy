package(default_visibility = ["//visibility:public"])

proto_library(
    name = "broker_protolib",
    srcs = ["broker.proto"],
)
proto_library(
    name = "comms_protolib",
    srcs = ["comms.proto"],
)

load("//tools:ts_proto_library.bzl", "ts_proto_library")

ts_proto_library(
    name = "broker_tslib",
    deps = [":broker_protolib"],
    output_name = "broker"
)

ts_proto_library(
    name = "comms_tslib",
    deps = [":comms_protolib"],
    output_name = "comms"
)

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "broker",
    srcs = glob(["broker.ts", "comms.ts"]),
    module_name = "@dcl/protos",
    deps = [
        ":broker_tslib",
        ":comms_tslib",
        "@npm//@types/node",
        "@npm//protobufjs",
    ],
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "protos",
    srcs = glob(["**/*.proto"]),
    package_layers = [
        "//:common.package.json",
        "protos.package.json",
    ],
    deps = [":comms_tslib", ":broker_tslib"],
)