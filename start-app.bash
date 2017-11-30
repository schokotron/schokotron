#!/bin/bash -l

cd /home/schokotron
if [ -d app ]; then
  cd app
  git pull
else
  git clone https://github.com/schokotron/schokotron.git app
  cd app
fi
cp ~/.env.production ./.env
cp ~/run ./run
chmod +x run

yarn start
