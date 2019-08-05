package(default_visibility = ["//visibility:public"])

filegroup(
    name = "sources",
    srcs = glob([
        "**/*.ts",
        "**/*.tsx",
    ]),
)

load("@build_bazel_rules_nodejs//:defs.bzl", "http_server", "rollup_bundle")
load("@build_bazel_rules_nodejs//internal/web_package:web_package.bzl", "web_package")
load("@npm_bazel_typescript//:defs.bzl", "ts_config", "ts_devserver", "ts_library")

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
        "rollup.config.js",
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
    enable_code_splitting = False,
    entry_point = ":src/index.tsx",
    globals = {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    deps = [
        ":config",
        ":webb",
    ],
)

web_package(
    name = "package",
    assets = [
        ":webb_bundle.min.js",
        ":webb_bundle.min.es2015.js",
    ],
    index_html = "static/index.html",
)

http_server(
    name = "server",
    data = [":package"],
    templated_args = ["package"],
)
