#!/bin/bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

# Install dependencies and build the app
npm install
npm run build
