#!/bin/bash

# 🚀 Quick Deploy Script for Staging
# This script will build and prepare files for deployment

echo "================================"
echo "🚀 Brosham Blog Fix - Deploy to Staging"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Building React app...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

echo -e "${BLUE}Step 3: Checking git status...${NC}"
git status --short
echo ""

echo -e "${YELLOW}Would you like to commit and push these changes? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}Step 4: Committing changes...${NC}"
    git add .
    git commit -m "Fix: Blog slug issues - Add debug tools and fix missing slugs"
    
    echo ""
    echo -e "${BLUE}Step 5: Pushing to repository...${NC}"
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully pushed to repository${NC}"
    else
        echo "⚠️  Push failed. You may need to pull first or resolve conflicts."
    fi
else
    echo "⏭️  Skipping git commit and push"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Local build complete!${NC}"
echo "================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Deploy files to staging server:"
echo "   • Upload dist/ folder"
echo "   • Upload api/ folder" 
echo "   • Upload public/blog-fixer.html"
echo ""
echo "2️⃣  Fix database slugs:"
echo "   Option A: Visit https://staging.broshamproperties.my/blog-fixer.html"
echo "   Option B: Run SQL: database/fix_blog_slugs.sql in phpMyAdmin"
echo "   Option C: SSH and run: php api/fix-blog-slugs.php"
echo ""
echo "3️⃣  Test:"
echo "   • Visit: https://staging.broshamproperties.my/blog"
echo "   • Click on posts to verify they load"
echo "   • Check browser console (F12) for debug logs"
echo ""
echo "📖 Full guide: STAGING_DEPLOY_GUIDE.md"
echo ""
