# Phase 3A: Content Management - Upload, Edit, Remove 📸

## 🎯 **Priority: Property Listings, Gallery & Blog Management**

**Goal:** Make upload, edit, and remove functions work properly from the UI

---

## 📊 **Current Status Audit**

### **✅ What Exists:**

#### **Listings:**
- ✅ `AdminListing.tsx` - Create new listing form
- ✅ `listing-save.php` - Save API endpoint
- ✅ `list.php` - List files API
- ✅ `delete.php` - Delete API
- ✅ `upload.php` - Upload images API
- ✅ `ImagesPanel` component - Image selection UI
- ❌ **Missing:** Edit existing listing
- ❌ **Missing:** Delete listing
- ❌ **Missing:** List all listings

#### **Blog:**
- ✅ `AdminBlog.tsx` - Create blog post form (partial)
- ❌ **Missing:** Save blog API
- ❌ **Missing:** Edit blog post
- ❌ **Missing:** Delete blog post
- ❌ **Missing:** List all blog posts
- ❌ **Missing:** Rich text editor

#### **Gallery:**
- ❌ **Missing:** Gallery management page
- ✅ `upload.php` - Can upload images
- ✅ `delete.php` - Can delete images
- ❌ **Missing:** Gallery UI
- ❌ **Missing:** Organize by categories

---

## 🛠️ **What Needs to Be Built/Fixed**

### **Phase 3A.1: Property Listings (Priority 1)**
**Estimated Time:** 4-5 hours

#### **Tasks:**
1. **List All Listings** (1 hour)
   - Create listings list view in admin
   - Show: thumbnail, title, price, status
   - Add Edit and Delete buttons

2. **Edit Listing** (1.5 hours)
   - Load existing listing data
   - Populate form with current values
   - Update existing listing
   - Handle image updates

3. **Delete Listing** (30 min)
   - Confirm dialog
   - Delete listing and associated images
   - Refresh list

4. **Fix/Test Upload** (1 hour)
   - Verify image upload works
   - Test multi-image upload
   - Set cover image
   - Handle upload errors

5. **Database Schema** (1 hour)
   - Create `listings` table
   - Store listing metadata
   - Create indexes for search

---

### **Phase 3A.2: Blog Posts (Priority 2)**
**Estimated Time:** 3-4 hours

#### **Tasks:**
1. **Complete Blog Create** (1 hour)
   - Finish `AdminBlog.tsx` form
   - Add rich text editor
   - Image upload for blog
   - Create blog save API

2. **List All Blog Posts** (45 min)
   - Create blog list view
   - Show: title, status, date
   - Edit and Delete buttons

3. **Edit Blog Post** (1 hour)
   - Load existing post
   - Edit in rich text editor
   - Update images
   - Save changes

4. **Delete Blog Post** (30 min)
   - Confirmation dialog
   - Delete post and images

5. **Database Schema** (45 min)
   - Create `blog_posts` table
   - Store content and metadata

---

### **Phase 3A.3: Gallery Management (Priority 3)**
**Estimated Time:** 2-3 hours

#### **Tasks:**
1. **Create Gallery Admin Page** (1.5 hours)
   - Grid view of all images
   - Upload multiple images
   - Show image details (size, date)
   - Categories/tags

2. **Edit Gallery Items** (45 min)
   - Edit caption/description
   - Change category
   - Set as featured

3. **Delete Images** (30 min)
   - Select multiple images
   - Bulk delete option
   - Confirmation dialog

4. **Database Schema** (30 min)
   - Create `gallery_images` table
   - Store metadata and categories

---

## 📋 **Implementation Plan - Day 1 (Tomorrow)**

### **Session 1: Property Listings Foundation (3 hours)**

#### **1.1 Create Listings Database Table** (30 min)
```sql
CREATE TABLE listings (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  price DECIMAL(12,2),
  currency VARCHAR(10),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  bedrooms INT,
  bathrooms INT,
  size_sqft INT,
  property_type VARCHAR(50),
  status VARCHAR(50),
  cover_image VARCHAR(500),
  gallery JSON,
  is_featured BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_city (city)
);
```

#### **1.2 Create Listings List API** (45 min)
- `api/listings.list.php` - Already exists, verify it works
- Returns all listings with pagination
- Filter by status

#### **1.3 Build Listings List UI** (1.5 hours)
- Table view of all listings
- Columns: Image, Title, Price, City, Status, Actions
- Edit and Delete buttons
- "Create New" button

#### **Test:** Can see all listings, navigate to edit/delete

---

### **Session 2: Edit & Delete Functionality (2.5 hours)**

#### **2.1 Create Edit Listing API** (45 min)
- `api/listing-update.php`
- Load existing listing by ID
- Update all fields
- Handle image updates

#### **2.2 Update AdminListing Form** (1 hour)
- Accept listing ID parameter
- Load existing data if editing
- Show "Update" vs "Create" button
- Handle image updates

#### **2.3 Delete Listing Function** (45 min)
- `api/listing-delete.php`
- Delete from database
- Delete associated images
- Return success/error

#### **Test:** Can edit and delete listings successfully

---

### **Session 3: Upload & Image Management** (2 hours)

#### **3.1 Test Current Upload** (30 min)
- Verify `api/upload.php` works
- Test multi-file upload
- Check file permissions
- Test error handling

#### **3.2 Fix Image Upload Issues** (1 hour)
- Fix any upload bugs
- Add progress indicators
- Handle large files
- Validate file types

#### **3.3 Image Gallery Selection** (30 min)
- Improve ImagesPanel UI
- Drag-to-reorder images
- Set cover image easily
- Preview before upload

#### **Test:** Upload works smoothly, images appear correctly

---

## 📋 **Implementation Plan - Day 2**

### **Session 4: Blog Posts (3 hours)**

#### **4.1 Create Blog Database** (30 min)
```sql
CREATE TABLE blog_posts (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  cover_image VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft',
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  INDEX idx_status (status)
);
```

#### **4.2 Create Blog APIs** (1.5 hours)
- `api/blog-save.php` - Create/update
- `api/blog-list.php` - List all posts
- `api/blog-delete.php` - Delete post

#### **4.3 Complete Blog UI** (1 hour)
- Finish AdminBlog form
- Add rich text editor (TipTap or similar)
- List view
- Edit/Delete buttons

---

### **Session 5: Gallery Management (2.5 hours)**

#### **5.1 Create Gallery Database** (30 min)
```sql
CREATE TABLE gallery_images (
  id VARCHAR(50) PRIMARY KEY,
  filename VARCHAR(255),
  url VARCHAR(500),
  caption TEXT,
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);
```

#### **5.2 Create Gallery APIs** (1 hour)
- `api/gallery-list.php`
- `api/gallery-update.php`
- `api/gallery-delete.php`

#### **5.3 Build Gallery Admin UI** (1 hour)
- Grid view with thumbnails
- Upload multiple files
- Edit captions
- Delete selected

---

## ✅ **Testing Checklist**

After each session, test:

### **Listings:**
- [ ] Create new listing
- [ ] Upload cover image
- [ ] Upload multiple gallery images
- [ ] Save listing successfully
- [ ] View listing in list
- [ ] Edit existing listing
- [ ] Update images
- [ ] Delete listing
- [ ] Deleted images are removed

### **Blog:**
- [ ] Create new blog post
- [ ] Format text with editor
- [ ] Upload cover image
- [ ] Save as draft
- [ ] Publish post
- [ ] Edit existing post
- [ ] Delete post

### **Gallery:**
- [ ] Upload multiple images
- [ ] Add captions
- [ ] Categorize images
- [ ] Delete images
- [ ] Bulk operations

---

## 🔧 **Known Issues to Fix**

Based on code review:

1. **Listings:**
   - ✅ Create works (mostly complete)
   - ❌ Edit not implemented
   - ❌ Delete not implemented
   - ❌ List view missing

2. **Blog:**
   - ⚠️ Create incomplete (no API)
   - ❌ No rich text editor
   - ❌ No list view
   - ❌ No edit/delete

3. **Gallery:**
   - ❌ No admin UI at all
   - ✅ Upload API exists
   - ✅ Delete API exists

---

## 📦 **Required Dependencies**

For rich text editor:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
```

---

## 🎯 **Tomorrow's Focus**

**Morning (3-4 hours):**
1. Create listings database table
2. Build listings list view
3. Implement edit functionality
4. Test create/edit/delete cycle

**Afternoon (2-3 hours):**
5. Fix any upload issues
6. Start blog database
7. Build blog save API
8. Begin blog UI improvements

**Expected Outcome:**
- ✅ Fully working listings management
- ✅ Working blog creation
- 🎯 Ready to continue with gallery tomorrow

---

## 💬 **Questions to Answer Tomorrow:**

Before we start:

1. **Listings:**
   - Do you need property categories? (Residential, Commercial, Land)
   - Need property features list? (Pool, Parking, Garden)
   - Need map integration for location?

2. **Blog:**
   - Need blog categories?
   - Need author field? (or just use logged-in user)
   - Need comments section?

3. **Gallery:**
   - Need categories? (Exterior, Interior, Before/After, etc.)
   - Need to link gallery images to properties?
   - Need download option for high-res images?

4. **General:**
   - What image sizes do you prefer?
   - Need image optimization/compression?
   - Need thumbnail generation?

---

**Ready to make content management work perfectly! 🚀**
