#!/bin/bash

apt-get update
apt-get install -y wget curl
apt-get update
apt-get install npm -y
npm cache clean
npm install n -g
n stable

apt-get purge -y nodejs npm

npm install -g @angular/cli
# npm install webpack -g
