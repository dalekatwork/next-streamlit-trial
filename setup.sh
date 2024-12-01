#!/bin/bash

# Install Node.js (if not installed in your environment already)
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

# Install Next.js dependencies
npm install

# Build the Next.js app to generate the 'out' directory
npm run build

# Ensure the 'out' directory exists
if [ ! -d "out" ]; then
    echo "Error: Next.js build directory 'out' not found. Please run 'npm run build'."
    exit 1
else
    echo "'out' directory exists. Build successful!"
fi
