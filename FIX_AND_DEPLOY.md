# ⚡ QUICK FIX - Build Error & Deploy

## 🔧 Step 1: Fix Build (Run these commands)

```bash
cd /Users/izwanrasip/Desktop/brosham-nest

# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Build
npm run build
```

**Expected output:** "✓ built in XXms"

---

## 📤 Step 2: Push to Git

```bash
git add .
git commit -m "Fix: Blog slug issue - add debug tools"
git push origin main
```

---

## 🌐 Step 3: Deploy on Staging

### If auto-deploy enabled:
Wait 1-2 minutes for deployment.

### If manual deploy needed:
SSH to server:
```bash
ssh user@staging.broshamproperties.my
cd /path/to/project
git pull origin main
npm install
npm run build
```

---

## 🔧 Step 4: Fix Database on Staging

Visit: **https://staging.broshamproperties.my/blog-fixer.html**

Click: **"Fix Missing Slugs"** button

---

## ✅ Step 5: Test

Visit: **https://staging.broshamproperties.my/blog**

Click on any post → Should load successfully! 🎉

---

## 🚨 Still Getting Build Error?

Try this alternative build command:
```bash
# Skip the copy-api.sh part
npm run dev:build
```

Or:
```bash
# Build without the bash script
vite build
```

Then manually copy API files after build succeeds.

---

**From now on, we'll always:**
✅ Build locally first
✅ Push to Git
✅ Test on staging
