#!/bin/bash

echo "🚀 Starting deployment..."

# Go to home directory
cd ~

# Check if demo folder exists
if [ -d "demo" ]; then
    echo "📂 Folder exists, pulling latest code..."
    cd demo
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone https://github.com/Devasish555/demo.git
    cd demo
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build React app
echo "🔨 Building React app..."
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    sudo npm install -g pm2
fi

# Stop existing process if running
pm2 stop gift-studio 2>/dev/null || true
pm2 delete gift-studio 2>/dev/null || true

# Start with PM2
echo "🚀 Starting server with PM2..."
pm2 start server/index.js --name "gift-studio"
pm2 save

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://104.214.169.124:3001"
echo "   Admin:    http://104.214.169.124:3001/admin"
echo "   API:      http://104.214.169.124:3001/api"
echo ""
pm2 status