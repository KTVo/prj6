#!/bin/sh

# Command used to build react front-end and copy everything over to the python backend

# First, git pull and build
git pull
echo "Finished git pull"
cd secondchancefrontend
npm run-script build
echo "Finished build"
cd ..
rm -rf ./backend/static/build/
echo "Finished removal"
cp -r ./secondchancefrontend/build/ ./backend/static/
cp ./backend/static/build/index.html ./backend/templates/
echo "Finished Copy, ready to launch server"

