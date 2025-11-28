#!/bin/bash
# Script to copy API files and tools to dist folder after build

echo "📦 Copying API files and tools to dist folder..."

# Create api directory in dist
mkdir -p dist/api

# Copy all PHP files
cp -r api/*.php dist/api/

# Copy .htaccess if it exists
if [ -f "api/.htaccess" ]; then
    cp api/.htaccess dist/api/
fi

# Copy blog-fixer.html from public to dist root
if [ -f "public/blog-fixer.html" ]; then
    cp public/blog-fixer.html dist/
    echo "✅ blog-fixer.html copied to dist/"
fi

echo "✅ API files copied successfully!"
echo ""
echo "📋 Files in dist/api:"
ls -la dist/api/

echo ""
echo "⚠️  IMPORTANT: Remember to update config.php credentials for production!"
