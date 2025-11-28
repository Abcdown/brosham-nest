# 🚀 Production Deployment Guide

## Overview
This guide will help you deploy the cleaned staging code to production while keeping listings/gallery under construction.

---

## Phase 1: Clean Staging (Do This First)

### Step 1: Clean Up API Files on Staging Server

**Delete these files from** `/api/` folder on staging server:
1. Login to Plesk File Manager
2. Navigate to `/api/` folder
3. Delete:
   - `test.php`
   - `test-db.php`
   - `generate-password.php`

### Step 2: Update login.php

1. Open `/api/login.php` in Plesk File Manager
2. Replace with the cleaned version from `cleanup/login.php`
3. Save

### Step 3: Update config.php Security Keys

1. Generate new keys (run in Terminal):
```bash
# Generate API Key
php -r "echo 'bp_live_' . bin2hex(random_bytes(32)) . PHP_EOL;"

# Generate JWT Secret
php -r "echo 'jwt_' . bin2hex(random_bytes(32)) . PHP_EOL;"
```

2. Update `/api/config.php` on server with new keys
3. Also disable error display:
```php
ini_set('display_errors', 0);
error_reporting(0);
```

### Step 4: Set Pages to Under Construction

1. Login to: `https://staging.broshamproperties.my/admin`
2. Go to Settings
3. **Disable** both:
   - Property Listings Page
   - Gallery Page
4. Save changes

### Step 5: Test Staging

Visit and verify:
- ✅ Home page works
- ✅ About page works
- ✅ Contact page works
- ✅ `/properties` shows "Under Construction"
- ✅ `/gallery` shows "Under Construction"
- ✅ Login/logout works
- ✅ No console errors

---

## Phase 2: Prepare Production Database

### Step 1: Create Production Database

In Plesk for `broshamproperties.my`:
1. Go to Databases
2. Create new database: `production_broshamp` (or similar)
3. Note the credentials

### Step 2: Create Users Table

1. Open phpMyAdmin for production database
2. Run the SQL from `database/create_users_table.sql`
3. Verify admin user exists

### Step 3: Update Production Password

1. Visit: `https://broshamproperties.my/api/generate-password.php` (after upload)
2. Copy the hash
3. Update admin password in production database

---

## Phase 3: Deploy to Production

### Step 1: Backup WordPress (Just in Case)

1. In Plesk, go to Websites & Domains
2. Click on `broshamproperties.my`
3. Go to **Backup Manager**
4. Create full backup
5. Download it

### Step 2: Remove WordPress Files

**Option A: Via Plesk File Manager**
1. Go to File Manager for `broshamproperties.my`
2. Select all WordPress files/folders
3. Move to a backup folder (e.g., `/wordpress-backup/`)
4. Keep: `.htaccess` (if it exists)

**Option B: Via Terminal (if you have SSH)**
```bash
cd /path/to/broshamproperties.my
mkdir wordpress-backup
mv * wordpress-backup/
# Except for .htaccess
```

### Step 3: Deploy React App

**From your local machine:**
```bash
cd ~/Desktop/brosham-nest

# Build production version
npm run build

# This creates a /dist folder with:
# - index.html
# - assets/
# - All compiled files
```

**Upload to Production:**
1. In Plesk File Manager for `broshamproperties.my`
2. Upload entire contents of `/dist/` folder to root
3. Should have: `index.html`, `assets/`, etc.

### Step 4: Upload API Files

1. Create `/api/` folder in production root
2. Upload all PHP files from your local `/api/` folder:
   - config.php
   - login.php
   - logout.php
   - verify-token.php
   - upload.php
   - list.php
   - delete.php
   - listing-save.php
   - health.api
   - ping.php

**SKIP the test files!**

### Step 5: Update config.php for Production

Edit `/api/config.php` on production server:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'production_broshamp'); // Your production DB name
define('DB_USER', 'your_prod_db_user'); // Production DB user
define('DB_PASS', 'your_prod_db_password'); // Production DB password

define('API_KEY', 'your_strong_api_key_here');
define('JWT_SECRET', 'your_strong_jwt_secret_here');

ini_set('display_errors', 0);
error_reporting(0);
```

### Step 6: Create Required Directories

In production root, create:
```
/lovable-uploads/
  /listings/
    /by-id/
```

Set permissions to 775 or 755.

---

## Phase 4: Configure Server for React (SPA)

### Create/Update .htaccess

In production root, create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Don't rewrite API calls
  RewriteCond %{REQUEST_URI} !^/api/
  
  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

This ensures React Router works properly.

---

## Phase 5: Test Production

### Test Checklist:

1. **Visit**: `https://broshamproperties.my`
   - ✅ Site loads (not WordPress)
   - ✅ Home page displays

2. **Test Navigation:**
   - ✅ Home → Works
   - ✅ About → Works
   - ✅ Contact → Works
   - ✅ Properties → Shows "Under Construction"
   - ✅ Gallery → Shows "Under Construction"

3. **Test Login:**
   - ✅ Visit `/login`
   - ✅ Login with admin credentials
   - ✅ Redirects to admin dashboard

4. **Test Admin:**
   - ✅ Dashboard loads
   - ✅ Settings page works
   - ✅ Can toggle pages on/off
   - ✅ Logout works

5. **Check Console:**
   - ✅ No errors in browser console (F12)
   - ✅ No 404 errors

---

## Phase 6: Post-Deployment

### Update DNS/SSL (if needed)

1. Ensure SSL certificate is active
2. Verify HTTPS works: `https://broshamproperties.my`
3. Set up redirect from HTTP to HTTPS

### Set Page Status

1. Login to admin
2. Go to Settings
3. Ensure Listings & Gallery are **DISABLED**
4. Save

### Monitor

Check Plesk error logs for any issues:
- Plesk → Logs → Error Log
- Look for PHP errors

---

## 🎊 Success!

Your production site is now live with:
- ✅ Working Home, About, Contact pages
- ✅ Listings & Gallery show "Under Construction"
- ✅ Secure admin login
- ✅ Clean, production-ready code

---

## Next: Continue Development on Staging

Now you can:
1. Keep working on listing/blog features on staging
2. Test thoroughly
3. Commit to Git when ready
4. Deploy to production
5. Enable Listings & Gallery pages

---

## Troubleshooting

### Issue: Site shows 404
- Check .htaccess file
- Verify index.html is in root

### Issue: API calls fail
- Check config.php credentials
- Verify database connection
- Check API folder permissions

### Issue: Login doesn't work
- Verify users table exists
- Check database credentials in config.php
- Test with `/api/test-db.php` (temporarily)

### Issue: Images don't upload
- Check `/lovable-uploads/` folder exists
- Verify folder permissions (775)
- Check PHP upload limits in Plesk

---

## Need Help?

If you encounter issues:
1. Check browser console (F12)
2. Check Plesk error logs
3. Verify all files uploaded correctly
4. Test API endpoints individually
