# 🎯 QUICK START - Gallery System Installation

## ⚡ 3-Step Installation (Takes ~10 minutes)

### ✅ STEP 1: Install Dependencies (2 minutes)

Open Terminal and run:

```bash
cd /Users/izwanrasip/Desktop/brosham-nest
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

Wait for installation to complete.

---

### ✅ STEP 2: Create Database Table (3 minutes)

1. **Open Plesk** in browser:
   - URL: https://w1214.mschosting.com:8443
   - Login with your credentials

2. **Go to phpMyAdmin**:
   - Click: Databases
   - Click: phpMyAdmin button
   
3. **Select Database**:
   - Click: `staging_broshamp` in left sidebar

4. **Run SQL**:
   - Click: SQL tab at top
   - Open this file: `/Users/izwanrasip/Desktop/brosham-nest/database/create_gallery_table.sql`
   - Copy ALL the SQL code
   - Paste into the SQL text box in phpMyAdmin
   - Click: "Go" button

5. **Verify Success**:
   - You should see message: "MySQL returned an empty result set"
   - Click on "gallery" table in left sidebar
   - You should see 6 sample images

---

### ✅ STEP 3: Build and Deploy (5 minutes)

Back in Terminal:

```bash
# Build the project
npm run build

# Commit all changes
git add .
git commit -m "Add gallery management system with drag-drop admin interface"

# Push to GitHub (triggers auto-deployment)
git push origin main
```

**Wait 1-2 minutes** for Plesk to auto-deploy.

---

## 🎉 DONE! Access Your Gallery

### Admin Gallery Management:
**URL**: https://staging.broshamproperties.my/admin/gallery

Login with admin credentials, then:
- View all gallery images
- Add new images
- Edit existing images
- Delete images
- Drag-and-drop to reorder
- Toggle featured/active status

### Public Gallery:
**URL**: https://staging.broshamproperties.my/gallery

Features:
- Featured image slider
- Category filtering
- Grid view
- Lightbox modal
- Keyboard navigation

---

## 📖 Full Documentation

For detailed information, see:
- `GALLERY_IMPLEMENTATION_COMPLETE.md` - Complete features & API docs
- `GALLERY_SETUP_GUIDE.md` - Setup guide with troubleshooting

---

## ❓ Quick Test

After deployment completes:

1. **Test Admin**: 
   - Go to: https://staging.broshamproperties.my/admin/gallery
   - You should see 6 sample images
   - Try adding a new one!

2. **Test Public**:
   - Go to: https://staging.broshamproperties.my/gallery
   - You should see the featured slider
   - Click on images to open lightbox

---

## 🐛 Having Issues?

### Dependencies won't install:
```bash
# Clear cache and try again
npm cache clean --force
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Database error:
- Make sure you selected `staging_broshamp` database
- Copy entire SQL file content (including sample data inserts)
- Check for error message in phpMyAdmin

### Site not updating after push:
- Wait 2 minutes for auto-deployment
- Check Plesk > Git > Repository status
- Manually click "Deploy" if needed

### 404 on admin/gallery:
- Clear browser cache
- Hard refresh: Cmd+Shift+R (Mac)
- Check App.tsx was committed

---

## 📞 Need Help?

Check the detailed guides:
1. Open `GALLERY_IMPLEMENTATION_COMPLETE.md`
2. Go to "🐛 Troubleshooting" section
3. Find your specific issue

---

**That's it!** 🚀

You now have a fully functional gallery management system!
