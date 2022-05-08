#!/bin/bash

rsync --chown=node:node --ignore-existing --delete -a "/app-cache/apps/${APP_NAME}/node_modules" "/app/apps/${APP_NAME}/"
rsync --chown=node:node --ignore-existing --delete -a "/app-cache/node_modules" "/app/"

exec "$@"
