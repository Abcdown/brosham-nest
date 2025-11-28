# 🔧 Build Error Fix & Deploy to Staging

## Step 1: Fix Build Error

Run this in your terminal:

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

# Install missing dependencies
npm install @radix-ui/react-dialog @radix-ui/react-alert-dialog

# Try build again
npm run build
```

If it still fails, try this:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Step 2: Push to Git

Once build succeeds:

```bash
# Add all files
git add .

# Commit with message
git commit -m "Fix: Blog slug issue - add debug tools and fixer"

# Push to repository
git push origin main
```

---

## Step 3: On Staging Server

### Option A: If staging auto-deploys from Git
Just wait for auto-deployment, then skip to Step 4.

### Option B: If you need to pull manually
SSH to staging and run:

```bash
ssh user@staging.broshamproperties.my
cd /path/to/your/project
git pull origin main
npm install
npm run build
```

---

## Step 4: Fix Database Slugs on Staging

Open this URL in your browser:
```
https://staging.broshamproperties.my/blog-fixer.html
```

Click the **"Fix Missing Slugs"** button.

Wait for success message: ✅ "Slugs fixed successfully!"

---

## Step 5: Test

Visit:
```
https://staging.broshamproperties.my/blog
```

- Click on any blog post
- It should load without "Blog Post Not Found" error
- Press F12 to see console logs (optional)

---

## ✅ Success!

If posts load correctly, you're done! 🎉

---

## 🚨 If Build Still Fails

Share the error message and I'll help fix it.
