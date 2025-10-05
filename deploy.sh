#!/bin/bash

# Greek Alphabet Learning App - Deployment Script
# This script helps deploy the application for self-hosting

set -e

echo "🚀 Greek Alphabet Learning App - Deployment Script"
echo "================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Function to deploy using Docker
deploy_docker() {
    print_status "Building and deploying with Docker..."

    # Build the application
    print_status "Building React application..."
    npm run build

    # Build Docker image
    print_status "Building Docker image..."
    docker build -t greek-alphabet-app .

    # Deploy with docker-compose
    print_status "Starting application with docker-compose..."
    docker-compose up -d

    print_success "Application deployed successfully!"
    print_status "Access your application at: http://localhost:8080"
    print_status "View logs with: docker-compose logs -f greek-alphabet-app"
    print_status "Stop with: docker-compose down"
}

# Function to deploy static files
deploy_static() {
    print_status "Building for static file deployment..."

    # Build the application
    npm run build

    print_success "Build completed!"
    print_status "Static files are ready in the 'build' directory"
    print_status ""
    print_status "To deploy:"
    print_status "1. Upload the contents of the 'build' directory to your web server"
    print_status "2. Configure your web server to serve static files"
    print_status "3. Ensure index.html is served for all routes (client-side routing)"
    print_status ""
    print_status "Example nginx configuration:"
    print_status "  location / {"
    print_status "    root /path/to/build;"
    print_status "    try_files \$uri \$uri/ /index.html;"
    print_status "  }"
}

# Function to show status
show_status() {
    print_status "Checking deployment status..."

    if command -v docker-compose &> /dev/null; then
        if docker-compose ps | grep -q "greek-alphabet-app"; then
            print_success "Application is running via Docker"
            print_status "Container status:"
            docker-compose ps
        else
            print_warning "Application is not running via Docker"
        fi
    fi

    if [ -d "build" ]; then
        print_success "Static build files exist"
        print_status "Build directory size: $(du -sh build | cut -f1)"
    else
        print_warning "No static build files found"
    fi
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up deployment files..."

    # Remove build directory
    if [ -d "build" ]; then
        rm -rf build
        print_status "Removed build directory"
    fi

    # Remove Docker containers
    if command -v docker-compose &> /dev/null; then
        docker-compose down 2>/dev/null || true
        print_status "Stopped Docker containers"
    fi

    print_success "Cleanup completed!"
}

# Main menu
case "${1:-help}" in
    "docker")
        deploy_docker
        ;;
    "static")
        deploy_static
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|*)
        echo "Usage: $0 {docker|static|status|cleanup}"
        echo ""
        echo "Commands:"
        echo "  docker   - Deploy using Docker (recommended)"
        echo "  static   - Build for static file hosting"
        echo "  status   - Show deployment status"
        echo "  cleanup  - Clean up deployment files"
        echo "  help     - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 docker      # Deploy with Docker"
        echo "  $0 static      # Build static files"
        echo "  $0 status      # Check if running"
        echo ""
        ;;
esac