package(default_visibility = ["//visibility:public"])

filegroup(
    name = "sources",
    srcs = glob([
        "**/*.ts",
        "**/*.tsx",
    ]),
)

load("@npm_bazel_typescript//:defs.bzl", "ts_config", "ts_library")

ts_config(
    name = "local-tsconfig",
    src = "tsconfig.local.json",
    deps = ["//:global-tsconfig"],
)

filegroup(
    name = "styles",
    srcs = glob(["src/**/*.css"]),
)

filegroup(
    name = "config",
    srcs = glob([
        "*.json",
        "webpack.config.js",
    ]),
)

filegroup(
    name = "static",
    srcs = glob(["static/*"]),
)

filegroup(
    name = "scripts",
    srcs = glob(["scripts/**/*.js"]),
)

ts_library(
    name = "webb",
    srcs = [":sources"],
    data = [
        ":styles",
        "//:global-tsconfig",
    ],
    tsconfig = ":local-tsconfig",
    deps = [
        "//utils",
        "//config",
        "//protos",
        "//client",
        # dependencies
        "@npm//@types/history",
        "@npm//@types/node",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/react-redux",
        "@npm//@types/react-router",
        "@npm//auth0-js",
        "@npm//connected-react-router",
        "@npm//decentraland-auth",
        "@npm//decentraland-auth-protocol",
        "@npm//decentraland-ui",
        "@npm//google-protobuf",
        "@npm//history",
        "@npm//react",
        "@npm//react-console-emulator",
        "@npm//react-dom",
        "@npm//react-redux",
        "@npm//react-router",
        "@npm//redux",
        "@npm//typesafe-actions",
        "@npm//typescript",
    ],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "rollup_bundle")

rollup_bundle(
    name = "webb_bundle",
    entry_point = ":src/index.tsx",
    globals = {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    deps = [
        ":webb",
    ],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

nodejs_binary(
    name = "dev",
    args = ["--node_options=--expose-gc"],
    data = [
        ":config",
        ":scripts",
        ":static",
        ":webb_bundle",
        "@npm//css-loader",
        "@npm//directory-tree",
        "@npm//html-webpack-plugin",
        "@npm//webpack",
        "@npm//webpack-dev-server",
    ],
    entry_point = ":scripts/start.js",
)

load("//tools/npm:package.bzl", "dcl_npm_package")

dcl_npm_package(
    name = "package",
    package_layers = [
        "//:common.package.json",
        "//:tslib.package.json",
        "webb.package.json",
    ],
    deps = [":webb"],
)
