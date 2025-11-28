# ⚡ QUICK REFERENCE CARD

## 🖥️ Commands To Run (Copy & Paste)

### On Your Computer:

```bash
# Navigate to project
cd /Users/izwanrasip/Desktop/brosham-nest

# Build the app
npm run build

# (Optional) Commit to git
git add .
git commit -m "Fix blog slugs"
git push origin main
```

---

## 🌐 URLs To Visit

After uploading files:

### Fix the slugs:
```
https://staging.broshamproperties.my/blog-fixer.html
```
👆 Click "Fix Missing Slugs" button

### Test the blog:
```
https://staging.broshamproperties.my/blog
```
👆 Click on posts to verify they work

### Debug endpoint (if needed):
```
https://staging.broshamproperties.my/api/blog-debug.php
```
👆 Shows all posts and their slugs

---

## 📁 Files To Upload

```
FROM                          →  TO (on staging server)
====================================================================
public/blog-fixer.html        →  /public_html/blog-fixer.html
api/fix-blog-slugs.php        →  /public_html/api/fix-blog-slugs.php  
api/blog-debug.php            →  /public_html/api/blog-debug.php
api/blog-list.php             →  /public_html/api/blog-list.php
dist/*                        →  /public_html/* (all files from dist)
```

---

## 🔧 SQL Fix (If Visual Tool Doesn't Work)

Run this in phpMyAdmin:

```sql
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

---

## ✅ Success Check

All these should work:
- [ ] https://staging.broshamproperties.my/blog (shows posts)
- [ ] Click "Read More" (opens post, no error)
- [ ] Console (F12) shows: `[BlogDetail] Found post: [Title]`

---

## 🆘 Emergency Contacts

If nothing works, share:
1. Screenshot of `blog-fixer.html` page
2. Browser console errors (F12 → Console)
3. What you tried so far

---

**That's all you need!** 🎉
