# ✅ Gallery System - Files Created Checklist

## 📁 Files Created Summary

### Backend PHP API Files (4 files)
- ✅ `/api/gallery-list.php` - Get images with filtering
- ✅ `/api/gallery-save.php` - Create/update images  
- ✅ `/api/gallery-delete.php` - Delete images
- ✅ `/api/gallery-reorder.php` - Drag-drop reordering

### Frontend React/TypeScript Files (4 files)
- ✅ `/src/lib/galleryApi.ts` - API client
- ✅ `/src/pages/AdminGalleryList.tsx` - Admin interface
- ✅ `/src/pages/Gallery.tsx` - Updated public gallery
- ✅ `/src/App.tsx` - Added route (MODIFIED)
- ✅ `/src/components/AdminLayout.tsx` - Added nav link (MODIFIED)

### Database Files (1 file)
- ✅ `/database/create_gallery_table.sql` - Table + sample data

### Documentation Files (4 files)
- ✅ `/GALLERY_SETUP_GUIDE.md` - Complete setup guide
- ✅ `/GALLERY_IMPLEMENTATION_COMPLETE.md` - Full documentation
- ✅ `/START_HERE_GALLERY.md` - Quick start guide
- ✅ `/install-gallery.sh` - Installation script

---

## 🎯 Installation Checklist

Use this checklist as you install:

### Pre-Installation
- [ ] Project is at: `/Users/izwanrasip/Desktop/brosham-nest/`
- [ ] You have admin access to Plesk
- [ ] You have phpMyAdmin access
- [ ] Git is configured and working

### Step 1: Dependencies
- [ ] Opened Terminal
- [ ] Changed to project directory
- [ ] Ran: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
- [ ] Installation completed without errors
- [ ] Verified in package.json

### Step 2: Database
- [ ] Opened Plesk in browser
- [ ] Accessed phpMyAdmin
- [ ] Selected `staging_broshamp` database
- [ ] Opened `/database/create_gallery_table.sql`
- [ ] Copied SQL code
- [ ] Pasted in phpMyAdmin SQL tab
- [ ] Clicked "Go"
- [ ] Saw success message
- [ ] Verified `gallery` table exists
- [ ] Checked 6 sample rows inserted

### Step 3: Build & Deploy
- [ ] Ran: `npm run build`
- [ ] Build completed successfully
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Add gallery system"`
- [ ] Ran: `git push origin main`
- [ ] Push succeeded
- [ ] Waited 2 minutes for auto-deploy
- [ ] Checked Plesk Git status

### Step 4: Testing
- [ ] Opened: https://staging.broshamproperties.my/admin
- [ ] Logged in successfully
- [ ] Clicked "Gallery" in sidebar
- [ ] Admin gallery page loads
- [ ] See 6 sample images in table
- [ ] Clicked "Add New Image" button
- [ ] Form opens correctly
- [ ] Opened: https://staging.broshamproperties.my/gallery
- [ ] Public gallery loads
- [ ] Featured slider shows images
- [ ] Category filter works
- [ ] Lightbox opens on click

---

## 🔍 Verification Steps

### Verify Backend Files
```bash
ls -la api/gallery-*.php
```
Should show 4 files:
- gallery-list.php
- gallery-save.php
- gallery-delete.php
- gallery-reorder.php

### Verify Frontend Files
```bash
ls -la src/pages/*Gallery*.tsx
ls -la src/lib/galleryApi.ts
```
Should show:
- AdminGalleryList.tsx
- Gallery.tsx
- galleryApi.ts

### Verify Database
In phpMyAdmin, run:
```sql
SELECT COUNT(*) as total FROM gallery;
```
Should return: **6** (sample images)

```sql
SELECT * FROM gallery LIMIT 3;
```
Should show 3 image rows with data.

### Verify API Endpoints
Open in browser:
- https://staging.broshamproperties.my/api/gallery-list.php

Should return JSON with images array.

---

## 📊 Feature Verification Matrix

| Feature | Location | Status |
|---------|----------|--------|
| Add Image | Admin > Gallery > Add New | ⬜ Test |
| Edit Image | Admin > Gallery > Click Edit | ⬜ Test |
| Delete Image | Admin > Gallery > Click Trash | ⬜ Test |
| Reorder Images | Admin > Gallery > Drag Handle | ⬜ Test |
| Toggle Featured | Admin > Gallery > Edit > Featured Switch | ⬜ Test |
| Toggle Status | Admin > Gallery > Edit > Active Switch | ⬜ Test |
| Featured Slider | Public Gallery > Top Carousel | ⬜ Test |
| Category Filter | Public Gallery > Category Buttons | ⬜ Test |
| Image Grid | Public Gallery > Grid Section | ⬜ Test |
| Lightbox | Public Gallery > Click Image | ⬜ Test |
| Keyboard Nav | Lightbox > Press ←/→ Keys | ⬜ Test |

---

## 🐛 Common Issues & Fixes

### ❌ `npm install` fails
**Fix**: 
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ Build fails
**Fix**: Check for TypeScript errors:
```bash
npm run build 2>&1 | grep error
```

### ❌ Database creation fails
**Fix**: 
- Ensure correct database selected
- Check user permissions
- Try creating table manually

### ❌ Admin gallery 404
**Fix**:
- Clear browser cache
- Check App.tsx has route
- Rebuild and redeploy

### ❌ Empty gallery on public
**Fix**:
- Check database has data
- Open browser console
- Check API response

### ❌ Drag-drop doesn't work
**Fix**:
```bash
npm list @dnd-kit/core
# If not found:
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm run build
```

---

## 📞 Support Resources

### Documentation
1. **START_HERE_GALLERY.md** - Quick start (this was Step 1)
2. **GALLERY_SETUP_GUIDE.md** - Detailed setup
3. **GALLERY_IMPLEMENTATION_COMPLETE.md** - Full docs

### Logs to Check
- **Browser Console**: Right-click > Inspect > Console
- **Network Tab**: Check API requests
- **Plesk Error Log**: Files > logs > error_log

### Test Endpoints
- API: `/api/gallery-list.php`
- Admin: `/admin/gallery`
- Public: `/gallery`

---

## ✨ Success Indicators

You'll know it's working when:

1. ✅ Admin gallery shows 6 sample images
2. ✅ Can add a new image successfully
3. ✅ Can drag-drop to reorder
4. ✅ Public gallery shows featured slider
5. ✅ Category filtering works
6. ✅ Lightbox opens and navigates
7. ✅ No errors in browser console
8. ✅ API returns proper JSON

---

## 🎉 Post-Installation

After successful installation:

### Immediate Tasks
1. ✅ Delete sample images (if desired)
2. ✅ Add your first real property image
3. ✅ Set featured images for slider
4. ✅ Organize by categories
5. ✅ Test on mobile devices

### Recommended
1. Take backup of database
2. Document your workflow
3. Train team on admin interface
4. Plan image upload schedule
5. Optimize existing images

---

## 📈 Usage Tips

### Best Practices
- Use descriptive titles
- Add locations for better SEO
- Feature 4-6 best images
- Keep active images under 50
- Regular backups

### Image Guidelines
- **Format**: JPG or PNG
- **Size**: Max 2MB per image
- **Dimensions**: 1920x1080 for featured
- **Naming**: Use descriptive filenames
- **Alt Text**: Use title field

### Categories
- Keep categories consistent
- Max 6-8 categories
- Use hierarchical if needed
- Review quarterly

---

## 🎯 Quick Reference

### Admin URL
```
https://staging.broshamproperties.my/admin/gallery
```

### Public URL
```
https://staging.broshamproperties.my/gallery
```

### Database Table
```
staging_broshamp.gallery
```

### API Endpoints
```
/api/gallery-list.php
/api/gallery-save.php
/api/gallery-delete.php
/api/gallery-reorder.php
```

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All files created and verified
- [ ] Dependencies installed
- [ ] Database table created with sample data
- [ ] Project built successfully
- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Auto-deployment completed
- [ ] Admin gallery accessible
- [ ] Public gallery accessible
- [ ] All features tested
- [ ] No errors in console
- [ ] Mobile responsive verified
- [ ] Documentation reviewed

---

**Installation Complete!** 🎊

Your gallery management system is now live and ready to use!

**Next Steps**: Open the admin gallery and start adding your property images!
