#!/bin/bash

# Gallery System Installation Script
# This script installs all dependencies and prepares for deployment

echo "🎨 Installing Gallery System for Brosham Properties..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root."
    exit 1
fi

echo "📦 Step 1: Installing @dnd-kit dependencies..."
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create database table:"
echo "   - Go to Plesk > Databases > phpMyAdmin"
echo "   - Select database: staging_broshamp"
echo "   - Run SQL from: database/create_gallery_table.sql"
echo ""
echo "2. Build and deploy:"
echo "   npm run build"
echo "   git add ."
echo "   git commit -m 'Add gallery management system'"
echo "   git push origin main"
echo ""
echo "3. Access the gallery:"
echo "   Admin: https://staging.broshamproperties.my/admin/gallery"
echo "   Public: https://staging.broshamproperties.my/gallery"
echo ""
echo "📖 Full instructions: GALLERY_SETUP_GUIDE.md"
echo ""
echo "🎉 Installation complete!"
