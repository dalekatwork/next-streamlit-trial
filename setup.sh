#!/bin/bash

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

# Navigate to the directory containing your Next.js app
cd /mount/src/next-streamlit-trial

# Install Node.js dependencies and build the Next.js app
npm install
npm run build
