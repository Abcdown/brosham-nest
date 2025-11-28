# Cleanup Checklist for Staging

## 🗑️ Files to DELETE from Server

### API Debug Files (Delete these from `/api/` folder):
- [ ] `test.php` - Debug endpoint
- [ ] `test-db.php` - Database connection test
- [ ] `generate-password.php` - Password hash generator
- [ ] `_bootstrap.php` - Old bootstrap (if using config.php instead)

## 🔧 Files to UPDATE

### 1. Remove Debug Logging from `login.php`

**Remove these lines** (around line 44-58):
```php
// Debug logging (remove in production)
error_log("Login attempt for: " . $username);
error_log("User found: " . ($user ? 'yes' : 'no'));
// ... all error_log() lines
```

Keep only the critical error logging in the catch block.

### 2. Update `config.php` Security

**Change these values:**
```php
// Change from:
define('API_KEY', 'your-secret-api-key-here');
define('JWT_SECRET', 'your-jwt-secret-key-change-this');

// To strong random strings:
define('API_KEY', 'bp_live_' . bin2hex(random_bytes(32)));
define('JWT_SECRET', 'jwt_' . bin2hex(random_bytes(32)));
```

Or generate them manually and paste.

### 3. Disable Error Display (for production)

In `config.php`, ensure:
```php
ini_set('display_errors', 0); // Already set
error_reporting(0); // Add this line
```

## ✅ Files to KEEP (These are production-ready)

### Core API Files:
- [x] `config.php` - Database config
- [x] `login.php` - Authentication
- [x] `logout.php` - Logout endpoint
- [x] `verify-token.php` - Token validation
- [x] `upload.php` - Image uploads
- [x] `list.php` - List images
- [x] `delete.php` - Delete images
- [x] `listing-save.php` - Save listings
- [x] `listings.create.php` - Create listing (DB)
- [x] `listings.list.php` - List listings (DB)
- [x] `health.api` - Health check
- [x] `ping.php` - Ping endpoint

## 🔐 Security Checklist

- [ ] Remove all `error_log()` debug statements
- [ ] Change default admin password
- [ ] Update API_KEY to strong random string
- [ ] Update JWT_SECRET to strong random string
- [ ] Disable PHP error display
- [ ] Remove test files
- [ ] Verify CORS settings are restrictive

## 📋 Default Settings for Production

Before deploying to production, ensure:

### In AdminSettings:
- [ ] Set "Property Listings" to **DISABLED** (under construction)
- [ ] Set "Gallery" to **DISABLED** (under construction)

This allows you to:
✅ Go live with working pages (Home, About, Contact)
✅ Keep developing Listings/Gallery on staging
✅ Enable them later when ready

## 🎯 Next Steps After Cleanup

1. Test all working features on staging
2. Commit cleaned code to Git
3. Deploy to production
4. Verify production works
5. Continue development on staging
