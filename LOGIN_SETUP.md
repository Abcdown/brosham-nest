# Login System Setup Guide

## 📋 Overview
This guide will help you set up the proper authentication system for Brosham Properties admin panel.

## 🗄️ Step 1: Create Users Table in Database

### Via phpMyAdmin:

1. **Login to phpMyAdmin** on your Plesk panel
2. **Select database**: `staging_broshamp`
3. **Go to SQL tab**
4. **Copy and paste** the content from `database/create_users_table.sql`
5. **Click "Go"** to execute

This will:
- ✅ Create a `users` table
- ✅ Add a default admin user with credentials:
  - **Username**: `admin`
  - **Password**: `Admin@123`

## ⚙️ Step 2: Configure Database Connection

1. **Open**: `api/config.php` on your server
2. **Update these values**:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'staging_broshamp');
define('DB_USER', 'your_db_username'); // ← Change this
define('DB_PASS', 'your_db_password'); // ← Change this
```

3. **Change security keys** (important for production):

```php
define('API_KEY', 'your-secret-api-key-here'); // ← Change this!
define('JWT_SECRET', 'your-jwt-secret-key-change-this'); // ← Change this!
```

## 📤 Step 3: Upload PHP Files to Server

Upload these files to your server's `api` folder:

```
/public_html/
  └── api/
      ├── config.php
      ├── login.php
      ├── logout.php
      └── verify-token.php
```

**Important**: Make sure these files are in the same `api` folder where your existing PHP files are (`upload.php`, `list.php`, etc.)

## 🧪 Step 4: Test the Login

1. **Visit**: `https://staging.broshamproperties.my/login`
2. **Enter credentials**:
   - Username: `admin`
   - Password: `Admin@123`
3. **Click Login**
4. ✅ You should be redirected to the admin dashboard

## 🔒 Security Notes

### For Production:
1. **Change default password** immediately after first login
2. **Use strong API keys** in `config.php`
3. **Update database credentials** with production values
4. **Enable HTTPS** (SSL certificate)
5. **Restrict API access** to specific domains in CORS settings

### Password Security:
- Passwords are hashed using PHP's `password_hash()` with bcrypt
- Never store plain text passwords
- To create new users, use the same password hashing method

## 🔧 Troubleshooting

### Issue: "Database connection failed"
**Solution**: Check `config.php` database credentials

### Issue: "Login failed" even with correct credentials
**Solution**: 
1. Check if `users` table exists
2. Verify default admin user was created
3. Check browser console for errors
4. Check PHP error logs

### Issue: CORS errors
**Solution**: Update `ALLOWED_ORIGINS` in `config.php`

## 👥 Adding More Users

To add more admin users, run this SQL in phpMyAdmin:

```sql
-- Generate password hash first using PHP:
-- password_hash('YourPassword123', PASSWORD_DEFAULT);

INSERT INTO users (username, password, email, full_name, role)
VALUES ('newadmin', '$2y$10$...hash_here...', 'email@example.com', 'Full Name', 'admin');
```

## 📝 Default Test Credentials

**For Testing Only:**
- Username: `admin`
- Password: `Admin@123`

**⚠️ IMPORTANT**: Change this password after your first login!

## ✅ Checklist

- [ ] Created `users` table in database
- [ ] Updated `config.php` with correct database credentials
- [ ] Uploaded PHP files to server
- [ ] Tested login with default credentials
- [ ] Changed default password
- [ ] Updated API keys for production
- [ ] Enabled HTTPS/SSL

## 🆘 Need Help?

If you encounter any issues:
1. Check PHP error logs in Plesk
2. Check browser console (F12) for JavaScript errors
3. Verify all files are uploaded correctly
4. Double-check database credentials
