#!/bin/sh
set -e

GIT_REPOSITORY="https://github.com/jawu90/helpugee.git"
APP_DIRECTORY="helpugee"
DEPLOYMENT_DIRECTORY="/home/deploy-helpugee/helpugee"

echo "$(date) - Changing work directory to rokin-deployment"
cd "$DEPLOYMENT_DIRECTORY"

source .env

echo "$(date) - Check if ./$APP_DIRECTORY exists"
if [ ! -d "$APP_DIRECTORY" ]; then
  # If it cannot find the GitHub SSH keys in known_hosts, add it
  echo "$(date) - Check that GitHub SSH key exists"
  ssh-keygen -F github.com || ssh-keyscan -H github.com >> ~/.ssh/known_hosts

  echo "$(date) - Directory does not exist, cloning it from git, using a custom ssh command to use the correct key"
  git clone "$GIT_REPOSITORY"
fi

echo "$(date) - Copy .env file into the cloned repository"
cp -f .env "$APP_DIRECTORY/"

echo "$(date) - Changing into directory ./$APP_DIRECTORY"
cd "$APP_DIRECTORY"

echo "$(date) - Retrieving latest version from git"
git fetch

echo "$(date) - Using latest 'main' branch"
git checkout origin/main

echo "$(date) - Building docker images"
docker-compose -f docker-compose.production.yml build

echo "Update of images complete. Will now restart the application!"
echo "$(date) - Stopping old application if it was running"
docker-compose -f docker-compose.production.yml down || echo "Containers are not running"

echo "$(date) - Start server in the background"
docker-compose -f docker-compose.production.yml up -d
