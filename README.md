# Decentraland Kernel: Webb Project

### Important

This repo requires `git lfs` to track images and other binary files. https://git-lfs.github.com/ and the latest version of GNU make, install it using `brew install make`

## Running locally

First, build the project:

    make build

To start hacking, run:

    make watch

To run the client in `debug` mode append the following query parameter to the URL:

    http://localhost:8080/?DEBUG_MODE

To run the client in first person perspective append the following query parameter to the URL:

    http://localhost:8080/?DEBUG_MODE&fps

To spawn in a specific set of coordinates append the following query paramter:

    http://localhost:8080/?DEBUG_MODE&fps&x=10&y=10

## Running tests

To run all test (and save new screenshots), run:

    make generate-images

To see test logs/errors directly in the browser, run:

    make watch and navigate to http://localhost:8080/test

## Copyright info

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE](https://github.com/decentraland/client/blob/master/LICENSE) file.
