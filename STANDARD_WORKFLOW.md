# 🎯 OUR STANDARD WORKFLOW - Git → Staging

From now on, we'll always use this workflow:

---

## ⚡ THE COMMANDS (Copy & Paste)

### 1️⃣ Fix Build Error (Run Once)
```bash
cd /Users/izwanrasip/Desktop/brosham-nest
rm -rf node_modules package-lock.json
npm install
```

### 2️⃣ Build
```bash
npm run build
```

### 3️⃣ Push to Git
```bash
git add .
git commit -m "Fix: Blog slug issue and add debug tools"
git push origin main
```

### 4️⃣ On Staging (if needed)
```bash
# SSH to staging
ssh user@staging.broshamproperties.my
cd /path/to/project
git pull origin main
npm install
npm run build
```

### 5️⃣ Fix Database
Open browser: **https://staging.broshamproperties.my/blog-fixer.html**
Click: **"Fix Missing Slugs"**

### 6️⃣ Test
Visit: **https://staging.broshamproperties.my/blog**

---

## ✅ DONE!

This is our standard workflow now. Every time we make changes:
1. Build locally
2. Push to Git  
3. Test on staging

No more local testing, no confusion! 🎉
