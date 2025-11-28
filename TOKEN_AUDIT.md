# TOKEN STANDARDIZATION AUDIT & FIX
## Date: 2025-11-27
## Project: Brosham Properties Admin System

### STANDARD TOKEN KEY
**Use this EVERYWHERE:** `ADMIN_TOKEN`

### TOKEN STORAGE FORMAT
```javascript
// Login successful - store these:
localStorage.setItem('ADMIN_TOKEN', token);          // JWT token
localStorage.setItem('ADMIN_USER', JSON.stringify(user)); // User object
localStorage.setItem('TOKEN_EXPIRY', expiry.toString());  // Unix timestamp
```

### FILES AUDITED & STATUS

#### ✅ CORRECT (Using ADMIN_TOKEN)
1. **src/lib/authApi.ts** - ✅ All uses ADMIN_TOKEN
2. **src/lib/listingsApi.ts** - ✅ All uses ADMIN_TOKEN  
3. **src/lib/pageSettings.ts** - ✅ Fixed to use ADMIN_TOKEN
4. **api/login.php** - ✅ Generates JWT tokens correctly

#### ❌ NEEDS ATTENTION
1. **src/lib/imagesApi.ts** - Uses `BP_API_KEY` (different system, OK)
2. **src/lib/publicListings.ts** - Need to check

### TOKEN USAGE BY FILE

#### Frontend (TypeScript/React)
```typescript
// ✅ CORRECT PATTERN
const token = localStorage.getItem('ADMIN_TOKEN');
if (!token) {
  throw new Error('Not authenticated');
}

fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

#### Backend (PHP)
```php
// ✅ CORRECT PATTERN
$token = getBearerToken();
if ($token) {
    $userData = verifyToken($token);
    if (!$userData) {
        http_response_code(401);
        jsonResponse(['success' => false, 'error' => 'Invalid token']);
        exit;
    }
}
```

### FILES USING AUTHENTICATION

#### Admin Panel (Requires ADMIN_TOKEN)
- Login page → Stores ADMIN_TOKEN
- Admin Dashboard
- Admin Blog
- Admin Listings (Create/Edit/Delete)
- Admin Settings
- Image Upload (Uses BP_API_KEY separately)

#### Public Pages (No Auth Required)
- Homepage
- Properties page
- Blog page
- Gallery page
- Contact page

### API ENDPOINTS TOKEN REQUIREMENTS

#### Requires ADMIN_TOKEN:
- `/api/login.php` - POST - Returns token
- `/api/logout.php` - POST - Invalidates token
- `/api/verify-token.php` - POST - Verifies token
- `/api/listings-save.php` - POST - Create/Update listing
- `/api/listings-delete.php` - POST - Delete listing
- `/api/listings-list.php` - GET (with auth) - Admin view all
- `/api/settings.php` - POST - Update settings

#### No Auth Required:
- `/api/listings-list.php` - GET (public) - Public listings only
- `/api/upload.php` - Uses BP_API_KEY
- `/api/list.php` - Uses BP_API_KEY
- `/api/delete.php` - Uses BP_API_KEY

### MIGRATION CHECKLIST

✅ authApi.ts - Uses ADMIN_TOKEN
✅ listingsApi.ts - Uses ADMIN_TOKEN
✅ pageSettings.ts - Fixed to ADMIN_TOKEN
✅ login.php - Generates JWT
✅ listings-save.php - Accepts Bearer token
✅ listings-delete.php - Fixed to use ADMIN_TOKEN
✅ listings-list.php - Accepts Bearer token
❓ Check other API files

### TESTING CHECKLIST

After deployment, test these flows:
1. ✅ Login → Should store ADMIN_TOKEN
2. ✅ Create listing → Should use ADMIN_TOKEN
3. ✅ Edit listing → Should use ADMIN_TOKEN
4. ✅ Delete listing → Should use ADMIN_TOKEN
5. ✅ Update settings → Should use ADMIN_TOKEN
6. ✅ Logout → Should clear ADMIN_TOKEN
7. ✅ Token expiry → Should redirect to login

### COMMON ISSUES & FIXES

**Issue:** "Invalid token" or "Not authenticated"
**Solution:** Check localStorage for ADMIN_TOKEN, verify it's a JWT (has 3 parts separated by dots)

**Issue:** Changes not saving
**Solution:** Verify API endpoint is checking for ADMIN_TOKEN, not auth_token or other variants

**Issue:** Logged out unexpectedly
**Solution:** Check TOKEN_EXPIRY, default is 24 hours (86400 seconds)
