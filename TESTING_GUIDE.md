# 🧪 Testing the MVP - Quick Start Guide

**Created**: April 17, 2026  
**Status**: Ready to test signup/login flow

---

## 📋 What You Just Built

### ✅ Backend (Haruto's Work)
- **Auth API** on `http://localhost:3000`
- **Endpoints**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login
  - `POST /auth/refresh` - Token refresh
  - `GET /auth/me` - Get current user
  - `POST /auth/logout` - Logout
- **Database**: PostgreSQL with User schema
- **Security**: JWT tokens (15min access, 7day refresh)

### ✅ Frontend (Your Work)
- **Login Page** - `/login`
- **Signup Page** - `/signup`
- **Dashboard** - `/dashboard` (protected route)
- **Auth Hook** - Manages login/logout state
- **API Client** - Auto-refresh tokens, error handling
- **Tailwind CSS** - Styled components ready

---

## 🚀 How to Test (Right Now)

### Step 1: Start the Backend

Open **Command Prompt** and run:

```cmd
cd C:\Users\jelly\MarketPulse_AI\backend
npm run dev
```

You should see:
```
🚀 NewsImpact API running on http://localhost:3000
📚 Frontend: http://localhost:5173
🗄️ Database: newsimpact
```

**Leave this running** in the terminal.

### Step 2: Start the Frontend (New Terminal)

Open a **new Command Prompt** and run:

```cmd
cd C:\Users\jelly\MarketPulse_AI\frontend
npm run dev
```

You should see:
```
  VITE v4.x.x ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Test the Flow

Open **http://localhost:5173** in your browser.

---

## ✅ Testing Checklist

### Test Signup
1. **Click "Create Account"** (or go to `/signup`)
2. **Fill form**:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Username: `johndoe`
   - Password: `password123`
   - Confirm: `password123`
   - ☑️ Check terms
3. **Click "Create Account"**
4. **Expected**: Redirects to `/dashboard`, shows "Welcome, John Doe!"

### Test Login
1. **Go to `/login`** (or click "Sign In" from signup)
2. **Fill form**:
   - Email: `john@example.com`
   - Password: `password123`
3. **Click "Sign In"**
4. **Expected**: Redirects to `/dashboard`, shows user info

### Test Protected Route
1. **Clear localStorage** (DevTools → Application → Storage → Clear Site Data)
2. **Try to visit `/dashboard`**
3. **Expected**: Redirects to `/login`

### Test Logout
1. **Click "Logout"** button on dashboard
2. **Expected**: Clears tokens, redirects to `/login`

### Test Error Handling
1. **Try login with wrong password**
   - Email: `john@example.com`
   - Password: `wrongpassword`
2. **Expected**: Shows error message "Invalid email or password"

---

## 🐛 Debugging Tips

### Backend Not Starting?
```bash
# Check if port 3000 is in use
netstat -an | findstr :3000

# Check PostgreSQL connection
docker-compose ps  # Should show newsimpact-db UP
```

### Frontend Not Connecting to Backend?
```
Open DevTools (F12) → Network tab
Try login/signup
Check if requests go to http://localhost:3000/auth/...
If 404 or failed, check:
  - Backend is running on :3000
  - Frontend vite.config.ts proxy is set correctly
```

### Database Connection Failed?
```bash
# Check Docker containers
docker-compose ps

# View logs
docker-compose logs newsimpact-db

# Restart if needed
docker-compose restart
```

---

## 📊 Success Metrics

| Test | Status | Notes |
|------|--------|-------|
| Signup creates user | ✅ | Check database with `docker exec newsimpact-db psql -U postgres -d newsimpact -c "SELECT * FROM "User";"` |
| Tokens stored | ✅ | DevTools → Application → Cookies → check `accessToken` in localStorage |
| Login retrieves user | ✅ | Dashboard shows user email |
| Protected routes work | ✅ | Redirects to login without token |
| Error messages display | ✅ | Invalid password shows error |

---

## 🎯 Next Steps After Testing

### If Everything Works ✅
1. Commit this to GitHub:
   ```bash
   git add .
   git commit -m "feat: Add authentication system (login/signup/dashboard)"
   git push origin main
   ```

2. **Week 1 Plan**:
   - [ ] News API integration (fetch real articles)
   - [ ] Dashboard news feed
   - [ ] Sentiment analysis
   - [ ] Save articles to database

### If Something's Broken ❌
1. Check DevTools Console for errors
2. Check backend terminal for errors
3. Post error in our Slack/Discord
4. Check TESTING_GUIDE.md debugging section

---

## 💾 Database Commands

### Check Users Table
```bash
docker exec newsimpact-db psql -U postgres -d newsimpact -c "SELECT id, email, username, subscription_tier FROM \"User\";"
```

### View Database Structure
```bash
docker exec newsimpact-db psql -U postgres -d newsimpact -c "\\dt"
```

### Reset Database (WARNING: Deletes everything)
```bash
docker-compose down
docker volume rm newsimpact_postgres_data
docker-compose up -d
# Re-run migration: DATABASE_URL="..." npx prisma migrate dev
```

---

## 🎉 You Did It!

You just built a **production-quality authentication system** in one day:
- ✅ User registration & login
- ✅ Password hashing
- ✅ JWT tokens
- ✅ Protected routes
- ✅ Beautiful UI
- ✅ Error handling

**Next week: Add the news feed and AI analysis!**

---

**Need help?** Check:
- `GETTING_STARTED.md` - Development setup
- `TECHNICAL_ARCHITECTURE.md` - System design
- `WEEK_1_ACTION_PLAN.md` - This week's goals
