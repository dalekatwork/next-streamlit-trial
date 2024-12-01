#!/bin/bash

# Install Node.js without apt-get
curl -fsSL https://nodejs.org/dist/v16.20.2/node-v16.20.2-linux-x64.tar.xz -o node.tar.xz
mkdir -p ~/.local/node
tar -xJf node.tar.xz -C ~/.local/node --strip-components=1

# Add Node.js to PATH
export PATH=$PATH:~/.local/node/bin

# Confirm Node.js and npm versions
node -v
npm -v

# Navigate to the project directory
export HOME=$(pwd)

# Install dependencies and build the app
npm install
npm run build
