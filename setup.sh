#!/bin/bash

# Install Node.js
curl -fsSL https://nodejs.org/dist/v16.20.2/node-v16.20.2-linux-x64.tar.xz -o node.tar.xz
mkdir -p ~/.local/node
tar -xJf node.tar.xz -C ~/.local/node --strip-components=1
export PATH=$PATH:~/.local/node/bin

echo "Contents of current directory:"
ls -al
echo "Contents of 'out' directory:"
ls -al out

# Install and build the Next.js app
npm install
npm run build

echo "Contents of current directory:"
ls -al
echo "Contents of 'out' directory:"
ls -al out
