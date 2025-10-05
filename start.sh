#!/bin/bash

# Greek Alphabet Learning App - Startup Script
# Quick start script for development and testing

set -e

echo "🇬🇷 Greek Alphabet Learning App"
echo "==============================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_status "Node.js is not installed. Please install Node.js 16+ to continue."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_status "npm is not installed. Please install npm to continue."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Start development server
print_status "Starting development server..."
print_status "Application will be available at: http://localhost:3000"
print_status "Press Ctrl+C to stop the server"
echo ""

npm start