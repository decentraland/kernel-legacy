workspace(name = "dcl")

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

skylib_version = "0.9.0"

http_archive(
    name = "bazel_skylib",
    sha256 = "1dde365491125a3db70731e25658dfdd3bc5dbdfd11b840b3e987ecf043c7ca0",
    type = "tar.gz",
    url = "https://github.com/bazelbuild/bazel-skylib/releases/download/{}/bazel_skylib-{}.tar.gz".format(skylib_version, skylib_version),
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

load("@bazel_skylib//lib:versions.bzl", "versions")

versions.check(minimum_bazel_version = "0.28.0")

git_repository(
    name = "bazel_javascript",
    branch = "master",
    remote = "https://github.com/zenclabs/bazel-javascript.git",
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "6625259f9f77ef90d795d20df1d0385d9b3ce63b6619325f702b6358abb4ab33",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.35.0/rules_nodejs-0.35.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

node_repositories(package_json = ["//:package.json"])

load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    symlink_node_modules = False,
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "68f5245048c899a50047ebf8015ace16345ffc6610e5431964464b612da7941f",
    strip_prefix = "buildtools-609ca6e8a79750cf4c6ce37bb92ae8d54876f9e1",
    url = "https://github.com/bazelbuild/buildtools/archive/609ca6e8a79750cf4c6ce37bb92ae8d54876f9e1.zip",
)

load("@com_github_bazelbuild_buildtools//buildifier:deps.bzl", "buildifier_dependencies")

buildifier_dependencies()

http_archive(
    name = "ts_protoc_gen",
    sha256 = "ad5d54a4e2028e2bbf90ac4208e06cc806dbbeae222f503f250bdf98bf62f00e",
    strip_prefix = "ts-protoc-gen-42d7e1f35b2cd7bf2919d9b15c618fe9861ab481",
    urls = ["https://github.com/Dig-Doug/ts-protoc-gen/archive/42d7e1f35b2cd7bf2919d9b15c618fe9861ab481.zip"],
)

load("@ts_protoc_gen//:defs.bzl", "typescript_proto_dependencies")

typescript_proto_dependencies()
