# 📝 Add Rich Text Editor to Blog - Complete Guide

## ✅ What We're Adding

A professional rich text editor (Quill) to replace the simple textarea in your blog creation form.

**Features:**
- Bold, italic, underline formatting
- Headers (H1-H6)
- Lists (ordered & unordered)
- Block quotes & code blocks
- Text colors & highlighting
- Links & images
- Text alignment
- Clean, professional toolbar

---

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
cd /Users/izwanrasip/Desktop/brosham-nest
npm install react-quill quill --save
```

### Step 2: Files Created

I've created these files for you:

1. **`src/components/RichTextEditor.tsx`** - The rich text editor component
2. **`src/components/RichTextEditor.css`** - Custom styling for the editor
3. **`src/pages/AdminBlogForm.tsx`** - Updated blog form (UPDATED)

---

## 📋 Deployment Steps

### 1. Build Locally

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

# Install the new packages
npm install

# Build
npm run build
```

### 2. Commit to Git

```bash
git add .
git commit -m "Add: Rich text editor for blog content"
git push origin main
```

### 3. Deploy to Staging

The deployment script will automatically copy files from `dist/` to `httpdocs/`.

Wait 1-2 minutes for auto-deploy, OR manually copy files in Plesk File Manager:
- Navigate to `staging.broshamproperties.my/httpdocs/dist/`
- Select all files
- Copy to parent directory (`httpdocs/`)

### 4. Test

Visit: `https://staging.broshamproperties.my/admin/blog/new`

You should see a rich text editor with a toolbar!

---

## 🎨 Editor Features

### Toolbar Options:
- **Headers:** H1, H2, H3, H4, H5, H6
- **Text Formatting:** Bold, Italic, Underline, Strikethrough
- **Lists:** Ordered list, Bullet list
- **Indentation:** Increase/decrease indent
- **Blocks:** Blockquote, Code block
- **Colors:** Text color, Background color
- **Alignment:** Left, Center, Right, Justify
- **Media:** Links, Images
- **Clear:** Remove formatting

---

## 💾 How Content is Saved

The editor saves content as **HTML**, which means:
- ✅ All formatting is preserved
- ✅ Content displays exactly as you designed it
- ✅ Works with your existing database

---

## 🧪 Testing Checklist

After deployment, test these:

- [ ] Create a new blog post
- [ ] Use bold, italic formatting
- [ ] Add headers (H1, H2, H3)
- [ ] Create bullet lists
- [ ] Add a link
- [ ] Save as draft
- [ ] View the post on the blog page
- [ ] Check that formatting displays correctly

---

## 🎯 Next Steps (Optional Enhancements)

If you want to add more features later:

1. **Image Upload** - Upload images directly instead of URLs
2. **Video Embed** - Embed YouTube/Vimeo videos
3. **Table Support** - Add tables to posts
4. **Custom Fonts** - More font options
5. **Code Syntax Highlighting** - For technical blogs

Let me know if you want any of these!

---

## 📝 Quick Reference

### Editor Component Usage

```tsx
import RichTextEditor from "@/components/RichTextEditor";

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Write your content..."
/>
```

### Toolbar Customization

Edit `/src/components/RichTextEditor.tsx` and modify the `modules.toolbar` array to add/remove buttons.

---

## ✅ Summary

**Created Files:**
- `/src/components/RichTextEditor.tsx`
- `/src/components/RichTextEditor.css`

**Updated Files:**
- `/src/pages/AdminBlogForm.tsx`

**Commands to Run:**
```bash
npm install
npm run build
git add .
git commit -m "Add: Rich text editor for blog"
git push origin main
```

**Test URL:**
https://staging.broshamproperties.my/admin/blog/new

---

🎉 **That's it! Your blog now has a professional rich text editor!**
