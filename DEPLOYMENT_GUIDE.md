# Deployment Guide - Brosham Properties

## 🌐 Environments

### **Local Development**
- URL: `http://localhost:8080`
- Database: N/A (uses staging/production API)
- Purpose: Development and testing

### **Staging**
- URL: `https://staging.broshamproperties.my`
- Database: `staging_broshamp`
- Deploy: Auto from GitHub `main` branch
- Purpose: Testing before production

### **Production**
- URL: `https://broshamproperties.my`
- Database: `production_broshamp`
- Deploy: Manual upload
- Purpose: Live public site

---

## 🔄 Standard Workflow

### **1. Local Development**

```bash
# Start dev server
cd ~/Desktop/brosham-nest
npm run dev

# Make your changes
# Test locally at http://localhost:8080
```

### **2. Commit to Git**

```bash
# Check changes
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat: Your feature description"

# Push to GitHub
git push origin main
```

### **3. Staging Auto-Deploys**

- Wait 2-3 minutes for deployment
- Check: `https://staging.broshamproperties.my`
- Test all changes thoroughly

### **4. Deploy to Production** (When ready)

```bash
# Build production version
cd ~/Desktop/brosham-nest
npm run build

# Create deployment package
cd dist
zip -r production-$(date +%Y%m%d-%H%M).zip .
```

**Then in Plesk:**
1. Backup current production (optional but recommended)
2. Delete `index.html` and `assets/` folder
3. Upload the new zip file
4. Extract it
5. Delete the zip
6. Verify `api/config.php` has production credentials
7. Test the live site

---

## 📦 What Gets Deployed

### **Frontend Files (from `dist/`):**
- `index.html` - Main entry point
- `assets/` - Compiled JS, CSS, images
- `lovable-uploads/` - User uploaded content
- `.htaccess` - Routing configuration
- `favicon.ico`, `robots.txt`, etc.

### **Backend Files (from `api/`):**
- `config.php` - Database configuration
- `*.php` - API endpoints
- Gets copied to `dist/api/` during build

---

## ⚙️ Environment-Specific Configuration

### **Staging Config (`api/config.php`)**
```php
define('DB_NAME', 'staging_broshamp');
define('DB_USER', 'bros_api');
define('DB_PASS', '31d0Ej2?d');
```

### **Production Config (`api/config.php`)**
```php
define('DB_NAME', 'production_broshamp');
define('DB_USER', 'broshamp');
define('DB_PASS', '^UR9bvof$b1veI1');
```

**⚠️ IMPORTANT:** Always verify `api/config.php` after deployment!

**Critical Check:**
- Make sure `setCorsHeaders()` and `jsonResponse()` are NOT in `config.php`
- These functions should ONLY be in `_bootstrap.php`
- Duplicate declarations will cause 500 errors

---

## 🗄️ Database Management

### **Staging Database**
- Name: `staging_broshamp`
- Access: Plesk → Databases → staging_broshamp
- phpMyAdmin available

### **Production Database**
- Name: `production_broshamp`
- Access: Plesk → Databases → production_broshamp
- phpMyAdmin available

### **Tables:**
- `users` - Admin users
- `settings` - Site settings (page toggles, etc.)

---

## 🔑 Admin Credentials

### **Production:**
- URL: `https://broshamproperties.my/login`
- Username: `admin`
- Password: `Admin@123`

### **Staging:**
- URL: `https://staging.broshamproperties.my/login`
- Username: `admin`
- Password: `Admin@123`

**🔒 TODO:** Change default password after initial setup!

---

## 🧪 Testing Checklist

Before deploying to production, verify on staging:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Login works
- [ ] Admin dashboard accessible
- [ ] Settings page works
- [ ] Listings page shows correct state (enabled/disabled)
- [ ] Gallery page shows correct state (enabled/disabled)
- [ ] Contact form works (if implemented)
- [ ] No console errors (F12)
- [ ] Mobile responsive design works
- [ ] Page refresh doesn't cause 404 errors

---

## 🚨 Emergency Rollback

If production breaks after deployment:

### **Option 1: Quick Rollback (if you have backup zip)**
1. Delete broken files
2. Upload previous working zip
3. Extract

### **Option 2: Restore from Backup**
1. Plesk → Backup Manager
2. Find latest backup
3. Restore website files

### **Option 3: Redeploy from Git**
1. Rebuild from last working commit
2. Upload manually

---

## 🛠️ Common Issues

### **Issue: 404 on page refresh**
**Solution:** Check `.htaccess` exists and has correct rewrite rules

### **Issue: Settings not applying**
**Solution:** Check `api/settings.php` exists and database table is created

### **Issue: Login not working**
**Solution:** Verify `api/config.php` has correct database credentials

### **Issue: API errors**
**Solution:** Check `api/config.php` credentials and database accessibility

---

## 📝 Deployment History

Keep track of deployments:

| Date | Version | Changes | Deployed By |
|------|---------|---------|-------------|
| 2025-11-23 | v1.0 | Initial production deployment | Izwan |
| | | - Removed WordPress | |
| | | - Database-driven settings | |
| | | - Security improvements | |

---

## 🔐 Security Notes

- Never commit `api/config.php` with real credentials to Git
- `.gitignore` excludes `api/config.php`
- Always update credentials manually after deployment
- Use strong passwords for admin accounts
- Regularly update dependencies

---

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review Git commit history
3. Check staging site for comparison
4. Review browser console for errors

---

## 🎯 Future Improvements

Consider these enhancements:
- [ ] Set up production auto-deploy (with caution)
- [ ] Implement staging → production promotion script
- [ ] Add deployment notifications (Slack/Email)
- [ ] Set up monitoring/alerts
- [ ] Implement backup automation
- [ ] Add deployment rollback script
