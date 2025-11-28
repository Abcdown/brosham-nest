# 🚀 Deploy Blog Fix to Staging - Complete Guide

## Prerequisites
- [ ] Git installed
- [ ] SSH access to staging server
- [ ] Node.js installed locally

---

## 📋 Deployment Steps

### **Step 1: Build the React App Locally**

Open terminal in your project folder and run:

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

**Expected Output:**
```
✓ built in XXXms
dist/index.html
dist/assets/...
```

The build will create a `dist/` folder with optimized files.

---

### **Step 2: Commit Your Changes to Git**

```bash
# Check what files have changed
git status

# Add all modified files
git add .

# Commit with a meaningful message
git commit -m "Fix blog slug issue - add debug tools and fix missing slugs"

# Push to your repository
git push origin main
```

**If you get errors about untracked files, that's okay - we'll handle it.**

---

### **Step 3: Upload to Staging Server**

You have 2 options:

#### **Option A: Using Git Pull (Recommended)**

SSH into your staging server:
```bash
ssh your-username@staging.broshamproperties.my
```

Then on the server:
```bash
# Navigate to your project
cd /path/to/your/project

# Pull latest changes
git pull origin main

# Rebuild on server
npm install
npm run build

# Restart any services if needed
# (e.g., pm2 restart app or systemctl restart nginx)
```

#### **Option B: Using FTP/SFTP (If Git not available on server)**

1. **Build locally first** (Step 1 above)
2. **Upload these files via FTP:**
   - `dist/` folder → Upload to `/public_html/` or your web root
   - `api/` folder → Upload to `/api/`
   - `public/blog-fixer.html` → Upload to `/public_html/`
   - `database/fix_blog_slugs.sql` → Upload to `/database/` (for reference)

---

### **Step 4: Fix the Slugs on Staging Database**

Once files are uploaded, you have 3 options:

#### **Option 1: Use the Visual Tool (Easiest)** ⭐

1. Open browser and go to: **`https://staging.broshamproperties.my/blog-fixer.html`**
2. Wait for page to load and auto-check posts
3. Click **"Fix Missing Slugs"** button
4. Wait for success message
5. Done! ✅

#### **Option 2: Run SQL Script**

1. Go to your staging phpMyAdmin
2. Select database: `staging_broshanp`
3. Click "SQL" tab
4. Copy contents of `database/fix_blog_slugs.sql`
5. Paste and click "Go"
6. Check results

#### **Option 3: Run PHP Script**

SSH to server and run:
```bash
cd /path/to/your/project
php api/fix-blog-slugs.php
```

---

### **Step 5: Test on Staging**

1. **Open**: `https://staging.broshamproperties.my/blog`
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. Look for logs: `[Blog] Loaded posts: [...]`
5. **Click "Read More"** on any post
6. Post should load successfully! ✅
7. Check console: `[BlogDetail] Found post: [Title]`

---

## 🔍 Quick Verification Checklist

After deployment, verify:

- [ ] Blog page loads: `https://staging.broshamproperties.my/blog`
- [ ] Console shows posts with slugs (not null)
- [ ] Click "Read More" opens the post (no 404)
- [ ] URL shows: `/blog/your-slug` (not `/blog/null`)
- [ ] No "Blog Post Not Found" error
- [ ] All published posts are visible

---

## 📁 Files That Need to Be on Staging

### New Files (Must Upload):
```
public/blog-fixer.html          ← Visual slug fixer tool
api/fix-blog-slugs.php          ← PHP script to fix slugs
api/blog-debug.php              ← Debug endpoint
database/fix_blog_slugs.sql     ← SQL fix script
BLOG_FIX_SUMMARY.md            ← Documentation
BLOG_FIX_CHECKLIST.md          ← Checklist
BLOG_DEBUG_GUIDE.md            ← Debug guide
```

### Modified Files (Must Upload):
```
src/pages/BlogDetail.tsx        ← Added debug logging
src/pages/Blog.tsx              ← Added debug logging
api/blog-list.php               ← Added slug logging
dist/                           ← Built React app (after npm run build)
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Build Fails
**Error**: `npm run build` fails

**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue 2: Git Push Fails
**Error**: Changes not pushing

**Solution**:
```bash
# Check git status
git status

# If branch is behind
git pull origin main
git push origin main
```

### Issue 3: Slugs Not Fixing on Staging
**Error**: Visual tool or script doesn't work

**Solution**:
1. Check database connection in `api/_bootstrap.php`
2. Verify database credentials for staging
3. Make sure `api/fix-blog-slugs.php` is uploaded
4. Try the SQL method in phpMyAdmin instead

### Issue 4: Blog Posts Still Show "Not Found"
**Error**: After fixing, posts still don't load

**Solution**:
1. Clear browser cache (Ctrl+Shift+R)
2. Check if slugs were actually updated in database
3. Run: `https://staging.broshamproperties.my/api/blog-debug.php`
4. Verify API returns slugs for all posts

---

## 📊 Quick Deploy Script

Create a file called `deploy.sh` in your project root:

```bash
#!/bin/bash

echo "🚀 Starting deployment to staging..."

# Build
echo "📦 Building React app..."
npm run build

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Fix blog slugs and add debug tools"

# Push to repository
echo "⬆️ Pushing to repository..."
git push origin main

echo "✅ Local build and push complete!"
echo ""
echo "Next steps:"
echo "1. SSH to staging server"
echo "2. Run: git pull origin main"
echo "3. Run: npm install && npm run build"
echo "4. Visit: https://staging.broshamproperties.my/blog-fixer.html"
echo "5. Click 'Fix Missing Slugs'"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

---

## 🎯 Recommended Deployment Flow

**The safest and easiest way:**

1. **Local**: Build and commit changes
   ```bash
   npm run build
   git add .
   git commit -m "Fix blog slugs"
   git push origin main
   ```

2. **Server**: Pull changes and rebuild
   ```bash
   ssh to staging
   cd /project/path
   git pull origin main
   npm install
   npm run build
   ```

3. **Browser**: Fix database slugs
   ```
   Visit: https://staging.broshamproperties.my/blog-fixer.html
   Click: "Fix Missing Slugs"
   ```

4. **Test**: Verify everything works
   ```
   Visit: https://staging.broshamproperties.my/blog
   Click on posts, check console
   ```

---

## 💡 Pro Tips

1. **Always test locally first** before deploying to staging
2. **Keep a backup** of your database before running fix scripts
3. **Use git tags** for deployments: `git tag -a v1.0.1 -m "Blog fix"`
4. **Monitor error logs** after deployment
5. **Test in incognito mode** to avoid cache issues

---

## 🆘 Need Help During Deployment?

If you encounter issues:

1. **Check the build output** for errors
2. **Verify file permissions** on server (755 for directories, 644 for files)
3. **Check PHP error logs** on staging server
4. **Test API endpoints** directly:
   - `https://staging.broshamproperties.my/api/blog-debug.php`
   - `https://staging.broshamproperties.my/api/blog-list.php`

Share any error messages you see!

---

## ✅ Success Criteria

Deployment is successful when:

- ✅ Build completes without errors
- ✅ Files uploaded to staging server
- ✅ Slugs fixed in staging database
- ✅ Blog page loads all posts
- ✅ Clicking posts opens detail pages
- ✅ No "Blog Post Not Found" errors
- ✅ Console shows proper slug values

**You're ready to deploy!** 🚀
