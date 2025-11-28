# Blog "Not Found" Issue - Debugging & Fix Guide

## Problem
When clicking "Read More" on a blog post, you get "Blog Post Not Found" error.

## Root Cause Analysis
The issue is likely one of these:
1. **Missing/NULL slugs** in the database
2. **Slug mismatch** between what's in the URL and what's in the database
3. **Empty slug values** in the database

## Step-by-Step Debugging

### Step 1: Check Current Slugs in Database
Run this SQL query in phpMyAdmin:

```sql
SELECT id, slug, title, status 
FROM blog_posts 
WHERE status = 'published' 
ORDER BY created_at DESC;
```

**Look for:**
- Any rows where `slug` is NULL
- Any rows where `slug` is empty ('')
- Verify the slug values look correct (lowercase, with hyphens)

### Step 2: Fix Missing Slugs
If you find posts with NULL or empty slugs, you have two options:

#### Option A: Fix via phpMyAdmin
For each post with a missing slug, run:

```sql
-- Example: Update a specific post
UPDATE blog_posts 
SET slug = 'your-slug-here' 
WHERE id = 'post_mid4kvv7x199m';
```

#### Option B: Use the Fix Script
1. Go to your browser
2. Visit: `http://localhost:3000/api/fix-blog-slugs.php` (or your domain)
3. The script will automatically fix all missing slugs

### Step 3: Test in Browser Console
1. Open your blog page: `http://localhost:3000/blog`
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. You should see logs like:
   ```
   [Blog] Loaded posts: [{id: "...", slug: "test-blog-1", title: "..."}, ...]
   ```
5. Click on a blog post
6. Check console for:
   ```
   [BlogDetail] Looking for post with id/slug: test-blog-1
   [BlogDetail] Available posts: [...]
   [BlogDetail] Found post: Test Blog 1 (or NOT FOUND)
   ```

### Step 4: Common Issues & Fixes

#### Issue 1: Slugs are NULL
**Symptoms:** Console shows `slug: null` in the posts array

**Fix:** Run this SQL:
```sql
-- Generate slugs for posts with NULL slugs
UPDATE blog_posts 
SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '.', ''))
WHERE slug IS NULL OR slug = '';
```

#### Issue 2: Slug contains special characters
**Symptoms:** URL has weird characters or doesn't match database

**Fix:** Regenerate slugs properly:
```sql
-- For a specific post
UPDATE blog_posts 
SET slug = 'clean-slug-here' 
WHERE id = 'post_id_here';
```

#### Issue 3: Duplicate slugs
**Symptoms:** Multiple posts with same slug

**Fix:** Make slugs unique:
```sql
-- Find duplicates
SELECT slug, COUNT(*) as count 
FROM blog_posts 
GROUP BY slug 
HAVING count > 1;

-- Fix by adding unique suffix
UPDATE blog_posts 
SET slug = CONCAT(slug, '-', SUBSTRING(MD5(id), 1, 6))
WHERE id IN (
    SELECT id FROM (
        SELECT id FROM blog_posts 
        WHERE slug IN (
            SELECT slug FROM blog_posts 
            GROUP BY slug HAVING COUNT(*) > 1
        )
    ) as temp
);
```

## Quick Fix Script (Run in Browser)

Visit this URL in your browser (replace with your actual domain):
```
http://localhost:3000/api/fix-blog-slugs.php
```

OR manually run the PHP script:
```bash
cd /your/project/path/api
php fix-blog-slugs.php
```

## Verification Checklist

After fixing, verify:
- [ ] All published posts have non-NULL, non-empty slugs
- [ ] All slugs are unique
- [ ] Slugs contain only lowercase letters, numbers, and hyphens
- [ ] Blog listing page loads without errors
- [ ] Clicking "Read More" successfully loads the blog post
- [ ] Browser console shows correct slug matching

## Testing Commands

### Test API Directly
```bash
# Test public blog list
curl http://localhost:3000/api/blog-list.php

# Check specific fields
curl http://localhost:3000/api/blog-debug.php
```

### Check PHP Error Logs
Look for logs showing which slugs are being loaded:
```
[blog-list.php] Post: Test Blog 1 | Slug: test-blog-1
```

## Expected Behavior After Fix

1. **Blog Page (`/blog`):**
   - All published posts display
   - "Read More" links use format: `/blog/[slug]`
   - Console shows: `[Blog] Loaded posts: [{slug: "...", ...}]`

2. **Blog Detail Page (`/blog/[slug]`):**
   - Post loads successfully
   - Console shows: `[BlogDetail] Found post: [Post Title]`
   - No "Blog Post Not Found" error

## Still Having Issues?

If the problem persists after trying these fixes:

1. **Check Network Tab:**
   - Open Developer Tools → Network tab
   - Click on blog post
   - Look at the API request to `/api/blog-list.php`
   - Check the response - are slugs present?

2. **Verify Database Connection:**
   - Test: `http://localhost:3000/api/blog-debug.php`
   - Should show all posts with their slugs

3. **Check for JavaScript Errors:**
   - Open Console tab
   - Look for any red errors
   - Share the error messages for further debugging

## Files Modified
- ✅ `src/pages/BlogDetail.tsx` - Added debug logging
- ✅ `src/pages/Blog.tsx` - Added debug logging  
- ✅ `api/blog-list.php` - Added slug logging
- ✅ `api/fix-blog-slugs.php` - Created slug fix script
- ✅ `api/blog-debug.php` - Created debug endpoint

## Next Steps
1. Run the fix script or manually fix slugs in database
2. Clear browser cache
3. Refresh blog page
4. Test clicking on posts
5. Check console logs to verify slugs are matching
