# API Deployment Solution 🔧

## Problem
The `/api/` folder doesn't auto-deploy to the server when pushing to Git, because the deployment process only uploads the built React app (`dist` folder).

## Solution
Automatically copy API files to `dist` folder during build process.

---

## ✅ What We've Set Up

### 1. Build Script: `copy-api.sh`
Automatically copies API files to `dist/api/` after build.

### 2. Updated package.json
Build commands now include API copying:
- `npm run build` - Build + copy API files
- `npm run build:prod` - Same as build

---

## 📋 How It Works

### When you run `npm run build`:

1. **Vite builds React app** → Creates `dist/` folder
2. **Script copies API files** → Creates `dist/api/` folder
3. **Result**: `dist/` contains both:
   - React app files (index.html, assets/, etc.)
   - API files (api/*.php)

### When you deploy `dist/` folder:
✅ React app is deployed
✅ API files are deployed
✅ Everything works together!

---

## 🚀 Future Deployments

### For Production Deployment:

**Step 1: Build locally**
```bash
cd ~/Desktop/brosham-nest
npm run build
```

**Step 2: Upload `dist/` folder**
Upload entire `dist/` folder to production server via:
- Plesk File Manager
- FTP
- Or automated deployment

**Step 3: Update config.php**
After upload, update `/api/config.php` on server with production credentials.

---

## 📊 Current Deployment Methods

### Method 1: Automated Build + Manual Upload (Recommended)
1. Run `npm run build` locally
2. Upload `dist/` folder to server
3. Update `config.php` on server

**Pros:**
- ✅ API files included automatically
- ✅ You control when to deploy
- ✅ Can review build before upload

**Cons:**
- ⚠️ Still need manual upload
- ⚠️ Must update config.php credentials

### Method 2: Manual API Upload (Current - Staging)
1. React app auto-deploys from Git
2. Manually upload API files when changed

**Pros:**
- ✅ Works for staging now
- ✅ Simple for small changes

**Cons:**
- ⚠️ Easy to forget
- ⚠️ API and frontend can get out of sync

---

## 🎯 Recommended Workflow

### For Staging:
Continue current method - API files manually uploaded when needed.

### For Production:
Use the new build script:
1. `npm run build` (includes API)
2. Upload entire `dist/` folder
3. Update config.php
4. Test

---

## 🔐 Important Security Notes

### API config.php Credentials

**Staging config.php:**
```php
define('DB_NAME', 'staging_broshamp');
define('DB_USER', 'bros_api');
define('DB_PASS', '31d0Ej2?d');
```

**Production config.php (will be different!):**
```php
define('DB_NAME', 'production_broshamp');
define('DB_USER', 'production_db_user');
define('DB_PASS', 'production_db_password');
```

⚠️ **Always update config.php on server after deployment!**

---

## 🧪 Testing the Build

To test the new build process:

```bash
cd ~/Desktop/brosham-nest

# Clean previous build
rm -rf dist

# Build with API copy
npm run build

# Check if API files are there
ls -la dist/api/

# You should see:
# config.php
# login.php
# logout.php
# upload.php
# etc.
```

---

## ✅ Benefits

1. **No More Forgetting API Files**
   - Automatically included in build
   - Frontend and backend stay in sync

2. **Easier Production Deployments**
   - One `dist/` folder contains everything
   - Upload once, works completely

3. **Professional Workflow**
   - Industry-standard practice
   - Repeatable and reliable

---

## 📝 Notes

- Script only runs on build, not during `npm run dev`
- API files in `dist/api/` are copies, not originals
- Edit original files in `/api/`, then rebuild
- Don't edit files in `dist/api/` (they'll be overwritten)

---

## 🎊 Ready to Use!

The setup is complete and will be included in your next Git commit.

**Next time you deploy to production:**
1. Run `npm run build`
2. Upload `dist/` folder
3. Update config.php
4. Done! ✅
