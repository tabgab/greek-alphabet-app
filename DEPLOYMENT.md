# 🚀 Greek Alphabet Learning App - Deployment Guide

This guide provides multiple options for self-hosting your Greek Alphabet Learning application.

## Table of Contents
- [Quick Start](#quick-start)
- [Docker Deployment (Recommended)](#docker-deployment-recommended)
- [Static File Hosting](#static-file-hosting)
- [Manual Deployment](#manual-deployment)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Quick Start

The fastest way to deploy your application:

```bash
# Using Docker (Recommended)
./deploy.sh docker

# Using static files
./deploy.sh static
```

## Docker Deployment (Recommended)

Docker provides the easiest and most reliable deployment method.

### Prerequisites
- Docker
- Docker Compose

### Deploy with Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Access Your Application

- **Local**: http://localhost:8080
- **Network**: http://your-server-ip:8080

### Docker Commands

```bash
# Check status
docker-compose ps

# View resource usage
docker-compose top

# Scale the application
docker-compose up -d --scale greek-alphabet-app=3

# Update the application
docker-compose pull && docker-compose up -d
```

## Static File Hosting

For simple hosting on shared servers or CDN.

### Build Static Files

```bash
# Build the application
npm run build

# Files will be in the 'build' directory
ls -la build/
```

### Upload to Web Server

Upload the contents of the `build` directory to your web server.

### Web Server Configuration

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/build

    <Directory /path/to/build>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # Handle client-side routing
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## Manual Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# The build files are now in the 'build' directory
```

### Environment Variables

Create a `.env` file for configuration:

```env
# Application Configuration
REACT_APP_TITLE="Greek Alphabet Learning"
REACT_APP_VERSION="1.0.0"

# API Configuration (if needed)
# REACT_APP_API_URL="https://api.yourdomain.com"
```

### Performance Optimization

The build process includes:
- Minified JavaScript and CSS
- Optimized images
- Gzip compression
- Service worker for offline support

## Configuration

### Nginx Configuration

For optimal performance and security:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### SSL/HTTPS Setup

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (add to crontab)
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Troubleshooting

### Common Issues

#### Application not loading
- Check if the build files exist: `ls -la build/`
- Verify web server configuration
- Check browser console for errors

#### Routing not working
- Ensure `try_files $uri $uri/ /index.html;` is configured
- Check if React Router is properly handling routes

#### Docker issues
```bash
# Check logs
docker-compose logs greek-alphabet-app

# Check container status
docker-compose ps

# Restart container
docker-compose restart greek-alphabet-app
```

#### Performance issues
- Enable gzip compression
- Set appropriate cache headers
- Optimize images

### Logs and Monitoring

#### Docker Logs
```bash
# Application logs
docker-compose logs -f greek-alphabet-app

# Nginx access logs (if using Docker)
docker-compose logs -f nginx-proxy
```

#### Health Checks
```bash
# Check application health
curl http://localhost:8080/health

# Monitor with external tools
curl -f http://your-domain.com/health || echo "Service is down"
```

### Backup and Recovery

#### Backup Application Data
The application uses localStorage for progress data. Users' progress is stored locally in their browsers.

#### Backup Deployment Files
```bash
# Create backup
tar -czf greek-alphabet-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=build \
  .

# Restore from backup
tar -xzf greek-alphabet-backup-*.tar.gz
```

## Support

### Getting Help

1. Check the troubleshooting section above
2. Review the browser console for JavaScript errors
3. Check web server logs
4. Verify all dependencies are installed

### Performance Monitoring

Monitor your application performance:
- Use browser DevTools for client-side performance
- Monitor server response times
- Check for memory leaks in long-running applications

## Security Considerations

- Regularly update dependencies: `npm audit fix`
- Use HTTPS in production
- Set appropriate security headers
- Monitor for vulnerabilities
- Regular backups

---

**Happy Learning! 🎓**

Your Greek Alphabet Learning application is now ready for self-hosting. Choose the deployment method that best fits your infrastructure and requirements.