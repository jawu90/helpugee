#!/bin/bash

rsync --chown=node:node --delete -a "/usr/src/cache/${APP_NAME}/node_modules" "/app/${APP_NAME}/"

exec "$@"
