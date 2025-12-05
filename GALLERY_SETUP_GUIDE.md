# Gallery System Installation & Deployment Guide

## 📦 STEP 1: Install Required Dependencies

The gallery system requires @dnd-kit for drag-and-drop image reordering.

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## 🗄️ STEP 2: Create Database Table

Run this SQL in phpMyAdmin (via Plesk):

1. Go to Plesk > Databases > phpMyAdmin
2. Select database: `staging_broshamp`
3. Go to SQL tab
4. Copy and paste the contents of `/database/create_gallery_table.sql`
5. Click "Go" to execute

The SQL file contains:
- Table creation for `gallery`
- Sample data (6 images from existing Gallery.tsx)

## ✅ STEP 3: Verify Files Created

All these files have been created automatically:

### API Files (Backend):
- ✅ `/api/gallery-list.php` - Get all gallery images
- ✅ `/api/gallery-save.php` - Create/update image
- ✅ `/api/gallery-delete.php` - Delete image
- ✅ `/api/gallery-reorder.php` - Reorder images

### TypeScript Files (Frontend):
- ✅ `/src/lib/galleryApi.ts` - API client
- ✅ `/src/pages/AdminGalleryList.tsx` - Admin management page
- ✅ `/src/pages/Gallery.tsx` - Updated public gallery (loads from DB)
- ✅ `/src/App.tsx` - Updated with gallery route

### Database Files:
- ✅ `/database/create_gallery_table.sql` - Table creation script

## 🚀 STEP 4: Build and Deploy

```bash
# Make sure you're in the project directory
cd /Users/izwanrasip/Desktop/brosham-nest

# Install the new dependencies
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Build the project
npm run build

# Commit and push
git add .
git commit -m "Add gallery management system with admin interface"
git push origin main
```

## 🎯 STEP 5: Access the Gallery Admin

After deployment:

1. **Admin Gallery Management**: https://staging.broshamproperties.my/admin/gallery
2. **Public Gallery Page**: https://staging.broshamproperties.my/gallery

## 📋 Features Included

### Admin Features:
- ✅ Add new images with title, description, URL
- ✅ Edit existing images
- ✅ Delete images with confirmation
- ✅ Drag-and-drop to reorder images
- ✅ Set images as "Featured" (appears in main slider)
- ✅ Categorize images (Exteriors, Interiors, Flipping Projects, etc.)
- ✅ Toggle active/inactive status
- ✅ Add location information

### Public Gallery Features:
- ✅ Featured image slider (auto-plays)
- ✅ Category filtering
- ✅ Grid view of all images
- ✅ Lightbox modal for full-size viewing
- ✅ Keyboard navigation in lightbox
- ✅ Responsive design

## 🔧 How to Use

### Adding a New Image:

1. Go to Admin > Gallery
2. Click "Add New Image" button
3. Fill in:
   - **Title** (required)
   - **Image URL** (required) - Use Lovable Uploads or external URL
   - **Description** (optional)
   - **Category** (Exteriors, Interiors, Flipping Projects, etc.)
   - **Location** (optional)
   - **Featured** - Toggle ON to show in main slider
   - **Active** - Toggle ON to make visible on public gallery
4. Click "Create Image"

### Editing an Image:

1. Find the image in the list
2. Click the Edit (pencil) icon
3. Update any fields
4. Click "Update Image"

### Reordering Images:

1. Click and hold the drag handle (≡) on the left of any image
2. Drag up or down to reorder
3. Release to save new position
4. Order is saved automatically!

### Deleting an Image:

1. Click the Trash icon on the image
2. Confirm deletion
3. Image is permanently removed from database

## 📸 Image URL Guidelines

You can use images from:

1. **Local Assets**: `/src/assets/image.jpg` (existing images)
2. **Lovable Uploads**: Upload via Admin Upload page
3. **External URLs**: `https://example.com/image.jpg`

Recommended image sizes:
- **Featured slider**: 1920x1080 or similar (landscape)
- **Grid thumbnails**: 800x600 or similar

## 🎨 Categories Available

Default categories:
- General
- Exteriors
- Interiors
- Flipping Projects
- Gardens
- Pools

You can add more by editing the Select dropdown in `AdminGalleryList.tsx`.

## 🔍 Troubleshooting

### Issue: Can't see images on public gallery
**Solution**: Make sure:
1. Images have `status = 'active'`
2. Image URLs are correct
3. Database table was created successfully

### Issue: Drag-and-drop not working
**Solution**: 
1. Run `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
2. Rebuild: `npm run build`

### Issue: 404 on admin gallery page
**Solution**: 
1. Make sure you've committed App.tsx changes
2. Rebuild and deploy

### Issue: API returns empty images
**Solution**:
1. Check database connection in `api/config.php`
2. Verify `gallery` table exists in database
3. Check browser console for errors

## 📝 Database Schema

```sql
gallery table:
- id (int, auto_increment)
- title (varchar 255) *required
- description (text)
- image_url (varchar 500) *required
- category (varchar 100)
- location (varchar 255)
- display_order (int) - used for drag-drop sorting
- is_featured (boolean) - shows in main slider
- status (enum: active/inactive)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎉 Next Steps

1. ✅ Install dependencies
2. ✅ Create database table
3. ✅ Build and deploy
4. ✅ Test admin gallery management
5. ✅ Add your first gallery images!
6. ✅ Test public gallery page
7. ✅ Customize categories as needed

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Plesk error logs: Files > logs > error_log
3. Verify all files are deployed correctly
4. Test API endpoints directly: `/api/gallery-list.php`

---

**Created**: December 2024
**For**: Brosham Properties Gallery System
**Status**: ✅ Ready to deploy!
