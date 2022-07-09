#!/bin/bash

packages=$(yarn -s workspaces info | jq -r 'keys[] as $k | "{\"key\": \"\($k)\", \"val\": \(.[$k] | .mismatchedWorkspaceDependencies) }"')
while read raw
do
  pkg=$(echo "$raw" | jq --raw-output '.key')
  deps=$(echo "$raw" | jq --raw-output '.val[] as $v | "\($v)@latest"')
  if [ ! -z "$deps" ]
  then
    yarn workspace $pkg add $deps
  fi
done <<< "$packages"
