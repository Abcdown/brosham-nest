# 🔧 Blank Page Troubleshooting Guide

## 🚨 Issue: Blank Page After Deployment

**Symptoms:**
- Staging site shows blank white page
- Files are loading (200 status in Network tab)
- No visible content
- Git deployment successful
- Build completed successfully

---

## 🔍 Diagnosis Steps

### Step 1: Check Browser Console (MOST IMPORTANT!)

1. **Open Developer Tools:**
   - Right-click anywhere → "Inspect"
   - Or press: `Cmd+Option+I` (Mac) / `F12` (Windows)

2. **Go to Console Tab**

3. **Look for RED errors**

4. **Take screenshot of any errors**

**Common errors you might see:**
- `Failed to load module`
- `Uncaught SyntaxError`
- `Cannot read property of undefined`
- `ChunkLoadError`

---

## 🎯 Most Likely Causes

### Cause 1: Deployment Script Issue

**Problem:** Plesk deployment script not copying files correctly

**Check Plesk Deployment Script:**
1. Plesk > Git > Repositories
2. Click on brosham-nest
3. Check "Additional deployment actions"
4. Should say: `cp -r dist/* .`

**If missing or wrong:**
1. Edit deployment actions
2. Add: `cp -r dist/* .`
3. Click "Deploy" manually
4. Wait for completion

### Cause 2: Wrong Document Root

**Problem:** Plesk pointing to wrong folder

**Check Document Root:**
1. Plesk > Domains > staging.broshamproperties.my
2. Check "Document root"
3. Should be: `/../staging.broshamproperties.my` 
4. Or: `/staging.broshamproperties.my/httpdocs`

**Files should be directly in httpdocs:**
```
httpdocs/
├── index.html          ← Must be here!
├── assets/
│   ├── index-*.js
│   └── index-*.css
├── api/
└── ...
```

**NOT in a subdirectory:**
```
httpdocs/
└── dist/              ← WRONG!
    └── index.html
```

### Cause 3: File Permissions

**Problem:** Files not readable by web server

**Fix in Plesk:**
1. Plesk > Files
2. Navigate to httpdocs
3. Select all files
4. Click "Change Permissions"
5. Set folders: 755
6. Set files: 644

### Cause 4: .htaccess Missing or Wrong

**Problem:** React Router needs proper .htaccess

**Check for .htaccess:**
1. Plesk > Files > httpdocs
2. Look for `.htaccess` file
3. If missing, create it

**Correct .htaccess content:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🛠️ Quick Fixes

### Fix 1: Manual File Copy in Plesk

1. **Go to Plesk File Manager:**
   - Plesk > Files
   - Navigate to: `staging.broshamproperties.my`

2. **Check current structure:**
   - If you see `dist/` folder → Files not copied correctly
   - If you see `index.html` directly → Files are in correct place

3. **If files in dist/ subfolder:**
   ```
   Select all files in dist/ folder
   → Copy
   → Navigate to parent (httpdocs)
   → Paste (overwrite if needed)
   ```

4. **Verify:**
   - `index.html` should be in root of httpdocs
   - `assets/` folder should be in root of httpdocs
   - `api/` folder should be in root of httpdocs

### Fix 2: Clear Cache & Hard Reload

Even if files are wrong, clear cache:
```
Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
Safari: Cmd+Option+R
```

### Fix 3: Check Plesk Error Logs

1. Plesk > Logs
2. Click on staging.broshamproperties.my
3. Select "Error Log"
4. Look for recent errors
5. Check if any PHP or Apache errors

### Fix 4: Verify Git Deployment Path

1. Plesk > Git > Repositories
2. Click brosham-nest
3. Check "Repository path"
4. Should be: `/home/broshamproperties.my/staging.broshamproperties.my`

5. Check "Target directory"
6. Should be: Repository path

---

## 📋 Verification Checklist

After trying fixes, verify each:

### File Structure
- [ ] `httpdocs/index.html` exists
- [ ] `httpdocs/assets/index-*.js` exists
- [ ] `httpdocs/assets/index-*.css` exists
- [ ] `httpdocs/api/` folder exists
- [ ] NO `httpdocs/dist/` subfolder

### Plesk Settings
- [ ] Document root is correct
- [ ] Deployment script: `cp -r dist/* .`
- [ ] Git shows recent deployment
- [ ] No errors in error log

### Browser
- [ ] Cache cleared
- [ ] Hard refresh done
- [ ] Console checked for errors
- [ ] Network tab shows 200 for all files

---

## 🎯 Step-by-Step Recovery Process

### Step 1: Verify File Structure in Plesk

```bash
# What you should see in httpdocs:
httpdocs/
├── index.html         ✅
├── assets/           ✅
│   ├── index-DAMmQ0jL.js
│   └── index-DNNQbRzE.css
├── api/              ✅
├── lovable-uploads/  ✅
└── robots.txt        ✅

# What you should NOT see:
httpdocs/
└── dist/             ❌ WRONG!
```

**If you see `dist/` folder:**
1. The deployment script didn't run
2. Or it ran incorrectly
3. Files need to be moved up one level

### Step 2: Fix Deployment Script

1. Plesk > Git > Repositories
2. Click "Configure" on brosham-nest
3. Additional deployment actions: `cp -r dist/* .`
4. Click "OK"
5. Click "Deploy" button
6. Wait for completion

### Step 3: Test

1. Clear browser cache
2. Visit: https://staging.broshamproperties.my
3. Should now load!

---

## 🔍 Console Error Solutions

If you see specific errors in Console:

### Error: "Failed to load module"
**Cause:** JS file path wrong or not copied
**Fix:** Verify files in assets/ folder

### Error: "ChunkLoadError" 
**Cause:** Build used code-splitting, chunks missing
**Fix:** Ensure ALL files from dist/ copied

### Error: "Unexpected token '<'"
**Cause:** JS file returning HTML (404)
**Fix:** Check file paths in Network tab

### Error: "Cannot find module '@/components/...'"
**Cause:** Build didn't resolve aliases correctly
**Fix:** Rebuild with `npm run build`

---

## 🚀 If Nothing Works - Nuclear Option

### Complete Redeployment

```bash
# On your local machine:
cd /Users/izwanrasip/Desktop/brosham-nest

# Clean everything
rm -rf dist node_modules package-lock.json

# Fresh install
npm install

# Fresh build
npm run build

# Verify dist folder locally
ls -la dist/
# Should show: index.html, assets/, api/, etc.

# Commit and push
git add .
git commit -m "Rebuild complete project"
git push origin main
```

Then in Plesk:
1. Git > Repositories > brosham-nest
2. Click "Deploy" button
3. Wait 2 minutes
4. Clear browser cache
5. Test again

---

## 📞 Quick Diagnosis Tool

**Open this URL in browser:**
```
https://staging.broshamproperties.my/assets/index-DAMmQ0jL.js
```

**Expected Result:** JavaScript code displays
**If you see:** 404 error → Files not deployed correctly
**If you see:** JS code → Files are there, check console for runtime errors

---

## ✅ Success Indicators

You'll know it's fixed when:
- [ ] Homepage loads with content
- [ ] No console errors (or only warnings)
- [ ] Can navigate to /admin
- [ ] Can navigate to /gallery
- [ ] No blank white page

---

## 🎯 Most Likely Solution

Based on common issues:

**90% chance:** Deployment script not running correctly
**Solution:** Manually copy files from dist/ to httpdocs root in Plesk File Manager

**10% chance:** .htaccess missing
**Solution:** Create .htaccess with rewrite rules

**Check Console errors to know for sure!**

---

## 📝 What To Send Me If Still Broken

If still not working, send screenshots of:
1. Browser Console tab (any red errors)
2. Browser Network tab (check if index-*.js is 200 or 404)
3. Plesk File Manager showing httpdocs structure
4. Plesk Git deployment log

This will help diagnose the exact issue!

---

**Remember:** The most important step is checking the **Browser Console** for JavaScript errors!

Good luck! 🚀
