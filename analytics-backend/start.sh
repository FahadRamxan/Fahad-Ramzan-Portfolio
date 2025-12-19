#!/bin/bash

echo "🚀 Starting Portfolio Analytics Backend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🎉 Starting the analytics server..."
echo "📊 Dashboard will be available at: http://localhost:3001/dashboard"
echo "🔌 API will be available at: http://localhost:3001/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start


