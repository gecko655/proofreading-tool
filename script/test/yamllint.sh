#!/usr/bin/env bash
find . -name '*.yml' | xargs yamllint -s -c ./config/yamllint.yml
