#!/bin/bash

for dir in `ls`; do
    if [ -d "$dir" ]; then
        cd $dir; cat builder.json| jq '.scene |[.components |.[] |.data | .mappings | select(. != null) |to_entries]|flatten| map({"file": .key|sub("[^/]+";"models"), "hash": .value})' > contents.json
    fi
done

