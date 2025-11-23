# Quick Deployment Reference 🚀

## Daily Development Workflow

```bash
# 1. Make changes locally
npm run dev

# 2. Commit to Git
git add .
git commit -m "feat: Your changes"
git push origin main

# 3. Wait 2-3 min, check staging
open https://staging.broshamproperties.my

# 4. If good, deploy to production
npm run build
cd dist
zip -r production-$(date +%Y%m%d).zip .
# Then upload via Plesk
```

---

## Environments Quick Links

| Environment | URL | Database | Deploy Method |
|-------------|-----|----------|---------------|
| **Local** | localhost:8080 | N/A | `npm run dev` |
| **Staging** | [staging.broshamproperties.my](https://staging.broshamproperties.my) | staging_broshamp | Auto from Git |
| **Production** | [broshamproperties.my](https://broshamproperties.my) | production_broshamp | Manual upload |

---

## One-Command Deploy to Production

```bash
npm run build && cd dist && zip -r ~/Desktop/prod-$(date +%Y%m%d-%H%M).zip . && cd .. && echo "✅ Build ready: ~/Desktop/prod-*.zip - Upload to Plesk!"
```

---

## Emergency Rollback

```bash
# 1. Find last working zip on Desktop
# 2. Upload to Plesk httpdocs
# 3. Extract
# 4. Done!
```

---

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check Git status
git status

# View commit history
git log --oneline -10

# Create deployment zip
cd dist && zip -r ../production.zip .
```

---

## Pre-Deploy Checklist ✅

Before deploying to production:

- [ ] Tested on staging
- [ ] No console errors
- [ ] All pages work
- [ ] Login works
- [ ] Mobile responsive
- [ ] Settings correct

---

## File Locations

```
Local:
~/Desktop/brosham-nest/

Staging Server:
/home/staging_user/staging.broshamproperties.my/

Production Server:
/home/broshamp/httpdocs/
```

---

## Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed info
2. Check `cleanup/` folder for setup docs
3. Review Git history: `git log`
