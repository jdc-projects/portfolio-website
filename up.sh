#!/bin/sh
podman compose down
podman compose up -d --build
