#!/bin/sh
podman compose build --no-cache
podman compose up -d
