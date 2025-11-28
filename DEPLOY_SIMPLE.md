# 🎯 SIMPLE 3-STEP DEPLOY TO STAGING

## What You Need To Do:

### **STEP 1: Build Locally** (On Your Computer)

Open **Terminal** (or Command Prompt) and run:

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

npm run build
```

Wait for it to finish. You should see "✓ built in XXms"

---

### **STEP 2: Upload Files to Staging**

Upload these files to staging.broshamproperties.my:

#### Via FTP/cPanel File Manager:

**Upload these NEW files:**
```
public/blog-fixer.html          → /public_html/blog-fixer.html
api/fix-blog-slugs.php          → /public_html/api/fix-blog-slugs.php
api/blog-debug.php              → /public_html/api/blog-debug.php
database/fix_blog_slugs.sql     → Just keep for reference
```

**Upload these UPDATED files:**
```
dist/                           → /public_html/ (replace all files in dist)
api/blog-list.php               → /public_html/api/blog-list.php
```

**OR via Git** (if you have SSH access):
```bash
# On your computer
git add .
git commit -m "Fix blog slugs"
git push origin main

# Then SSH to staging
ssh user@staging.broshamproperties.my
cd /path/to/project
git pull origin main
npm run build
```

---

### **STEP 3: Fix Database Slugs on Staging**

**Choose the EASIEST option for you:**

#### **Option A: Visual Tool** ⭐ **RECOMMENDED - NO SQL NEEDED**

1. Open browser
2. Go to: **`https://staging.broshamproperties.my/blog-fixer.html`**
3. Click **"Fix Missing Slugs"** button
4. Wait for "✅ Slugs fixed successfully!"
5. **DONE!**

#### **Option B: SQL in phpMyAdmin**

1. Login to cPanel
2. Open phpMyAdmin
3. Select database: `staging_broshanp`
4. Click **"SQL"** tab
5. Copy this and paste:

```sql
-- Fix missing slugs
UPDATE blog_posts 
SET slug = LOWER(
    TRIM(
        REPLACE(
            REPLACE(
                REPLACE(title, ' ', '-'),
                '.', ''
            ),
            ',', ''
        )
    )
)
WHERE slug IS NULL OR slug = '';
```

6. Click **"Go"**
7. **DONE!**

---

## 🧪 TEST IT

After completing all steps:

1. Open: **`https://staging.broshamproperties.my/blog`**
2. You should see all blog posts
3. Click **"Read More"** on any post
4. Post should open successfully (no "Not Found" error)
5. ✅ **SUCCESS!**

---

## 🚨 If You Get Stuck

**Can't build?**
```bash
# Try this first
rm -rf node_modules
npm install
npm run build
```

**Visual tool not working?**
- Use Option B (SQL method) instead
- It's just as easy!

**Still showing "Not Found"?**
- Press **Ctrl+Shift+R** (or **Cmd+Shift+R**) to hard refresh
- Check if files were uploaded correctly
- Try SQL method to make sure slugs were updated

---

## 📋 Quick Checklist

Before you start:
- [ ] Terminal/Command Prompt open
- [ ] FTP/cPanel access ready (or Git credentials)
- [ ] phpMyAdmin access (for Option B)

After deploy:
- [ ] Built successfully locally
- [ ] Files uploaded to staging
- [ ] Ran slug fix (Option A or B)
- [ ] Tested blog page - posts load ✅
- [ ] Tested clicking post - detail page loads ✅

---

## 🎉 That's It!

**Total time: ~5-10 minutes**

The visual tool (Option A) is the easiest. Just upload the files and click one button!

**Need help?** Let me know which step you're stuck on!
