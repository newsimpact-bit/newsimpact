# 🚀 Haruto's Setup Guide & Task List

**Date**: April 17, 2026  
**Role**: Backend Lead & DevOps  
**Status**: Ready to join the team!

---

## ✅ PART 1: Environment Setup (On Your Computer)

Before you can start coding, you need to set up your local environment. Follow these steps in order.

### Step 1: Install Required Software (30 mins)

You'll need these on your machine:

**A) Node.js (with npm)**
- Go to https://nodejs.org
- Download **LTS version** (20.x or 22.x)
- Install with default settings
- Verify: `node --version` and `npm --version` in Command Prompt

**B) Docker Desktop**
- Go to https://www.docker.com/products/docker-desktop
- Download for Windows
- Install (requires restart)
- Verify: `docker --version` in Command Prompt

**C) Git**
- Go to https://git-scm.com
- Download for Windows
- Install with default settings
- Verify: `git --version` in Command Prompt

**D) Code Editor (Optional but recommended)**
- VS Code: https://code.visualstudio.com
- Extensions to install:
  - "ES7+ React/Redux/React-Native snippets"
  - "Thunder Client" (for API testing)
  - "Prettier" (code formatter)

---

### Step 2: Clone the Repository (5 mins)

Open Command Prompt and run:

```bash
cd C:\Users\{YOUR_USERNAME}
git clone https://github.com/newsimpact-bit/newsimpact.git
cd newsimpact
```

You now have all the code on your computer!

---

### Step 3: Install Dependencies (15 mins)

```bash
# Backend dependencies
cd backend
npm install

# Verify installation
npm run typecheck

# You should see: "0 errors"
```

---

### Step 4: Set Up Environment Variables (5 mins)

**Copy the template:**
```bash
cd C:\Users\{YOUR_USERNAME}\newsimpact
copy .env.example .env.local
```

**Edit `.env.local` in VS Code:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/newsimpact
REDIS_URL=redis://localhost:6379
JWT_SECRET=newsimpact_dev_secret_key_change_in_production_12345678901234567890
JWT_REFRESH_SECRET=newsimpact_refresh_secret_key_change_in_production_98765432109876543210
NEWSAPI_KEY=placeholder_get_from_newsapi_org
NODE_ENV=development
API_PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

### Step 5: Start Docker Services (5 mins)

```bash
cd C:\Users\{YOUR_USERNAME}\newsimpact

# Start PostgreSQL + Redis
docker-compose up -d

# Verify containers are running
docker-compose ps

# You should see:
# newsimpact-db    (UP)
# newsimpact-redis (UP)
```

---

### Step 6: Run Database Migrations (5 mins)

```bash
cd backend

# Run migrations
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/newsimpact" npx prisma migrate deploy

# If that doesn't work, try:
npx prisma generate
```

✅ **Your environment is ready!**

---

## 🚀 PART 2: Start the Backend Server

Once environment setup is complete:

```bash
cd C:\Users\{YOUR_USERNAME}\newsimpact\backend

# Start the dev server
npm run dev

# You should see:
# 🚀 NewsImpact API running on http://localhost:3000
```

**Keep this running** while you develop. It auto-reloads when you save files.

---

## ✅ PART 3: Test Your Setup

Make sure everything works:

```bash
# In a NEW Command Prompt window, test the API:

curl http://localhost:3000/health

# You should get:
# {"status":"ok","timestamp":"...","environment":"development"}
```

✅ **If you see this, you're good to go!**

---

## 📋 PART 4: What's Already Built (Don't Change!)

Here's what we've completed so far:

### ✅ Backend
- **Auth API** - User registration, login, token refresh
- **Database Schema** - User model, Subscriptions, Articles
- **Middleware** - JWT token verification
- **Password Security** - bcrypt hashing
- **Type Safety** - Full TypeScript

### ✅ Frontend  
- **Login/Signup Pages** - Beautiful UI with form validation
- **Dashboard** - Protected route showing user info
- **Auth Hook** - Token management & auto-refresh
- **Professional Design** - Unique formal style

### ✅ Infrastructure
- **Docker** - PostgreSQL + Redis
- **Prisma ORM** - Database management
- **Express.js** - REST API framework
- **Vite** - Frontend dev server with proxying

---

## 🎯 HARUTO'S TASK LIST (Week 1)

Pick tasks in this order based on time availability:

### Priority 1: News API Integration (2-3 hours)

**What**: Fetch real articles from NewsAPI.org

**Files to create**:
```
backend/src/services/newsService.ts - API client
backend/src/api/news.ts - News endpoints
```

**Tasks**:
- [ ] Get NewsAPI key from https://newsapi.org
- [ ] Create `newsService.ts` with methods:
  - `fetchLatestNews(keywords: string)` - Get articles
  - `fetchNewsByCategory(category: string)` - Business, tech, etc.
- [ ] Create `news.ts` routes:
  - `GET /news/latest` - Return top 20 articles
  - `GET /news/search?q=AI` - Search articles
- [ ] Add NewsAPI key to `.env.local`
- [ ] Test endpoints with Thunder Client

**What this enables**: Frontend can display real news articles

---

### Priority 2: Save Articles to Database (1-2 hours)

**What**: Store articles in PostgreSQL for user preferences

**Tasks**:
- [ ] Update Prisma schema to add `SavedArticle` model
- [ ] Create `articleService.ts` with:
  - `saveArticle(userId, articleData)` - Save to DB
  - `getUserArticles(userId)` - Get user's saved articles
  - `deleteArticle(userId, articleId)` - Remove saved article
- [ ] Create endpoints in `news.ts`:
  - `POST /articles/save` - Save article (requires auth)
  - `GET /articles/saved` - Get user's saved articles
  - `DELETE /articles/:id` - Delete saved article
- [ ] Test with authenticated requests

**What this enables**: Users can bookmark articles they like

---

### Priority 3: Sentiment Analysis Pipeline (2-3 hours)

**What**: Score articles as positive/negative/neutral

**Files to create**:
```
backend/src/services/sentimentService.ts - AI analysis
```

**Tasks**:
- [ ] Install sentiment library: `npm install sentiment`
- [ ] Create `sentimentService.ts` with:
  - `analyzeSentiment(text: string)` - Score text (-1 to 1)
  - `analyzeArticle(article)` - Score full article
- [ ] Modify `newsService.ts` to add sentiment to articles:
  ```typescript
  const articles = await fetchLatestNews()
  articles = articles.map(article => ({
    ...article,
    sentiment: sentimentService.analyzeSentiment(article.title + article.description)
  }))
  ```
- [ ] Add `sentiment` field to Article model in Prisma
- [ ] Run migration: `npx prisma migrate dev --name add_sentiment`
- [ ] Test by fetching articles and checking sentiment scores

**What this enables**: Dashboard shows if news is positive/negative/neutral

---

### Priority 4: Market Impact Detection (2 hours)

**What**: Identify which stocks/markets are affected by news

**Tasks**:
- [ ] Create `impactService.ts` with:
  - `detectAffectedTickers(article)` - Extract stock symbols from text
  - `scoreImpact(sentiment, tickers)` - How important is this news?
- [ ] Add to Article model:
  - `affectedTickers` - array of ["AAPL", "MSFT"]
  - `impactScore` - 1-10 scale
- [ ] Modify newsService to call impactService
- [ ] Test with articles about Apple, Tesla, etc.

**What this enables**: Users can see which stocks are affected by news

---

### Priority 5: Rate Limiting & Security (1 hour)

**What**: Prevent API abuse

**Tasks**:
- [ ] Add rate limiting to auth endpoints (5 attempts per minute)
- [ ] Add rate limiting to news endpoints (100 requests/hour for free users)
- [ ] Express is already using `helmet` for security - verify it's enabled
- [ ] Add request validation middleware
- [ ] Test by making rapid requests, verify 429 responses

**What this enables**: App is protected against abuse/DDoS

---

## 🧪 Testing Your Code

After each task, test locally:

**Option 1: Command Line (curl)**
```bash
# Test login
curl -X POST http://localhost:3000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

# Test news endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" ^
  http://localhost:3000/news/latest
```

**Option 2: Thunder Client (Easier)**
- Open VS Code Thunder Client extension
- Create request
- Set method: POST
- Set URL: http://localhost:3000/auth/login
- Add headers: Content-Type: application/json
- Add body: `{"email":"test@example.com","password":"password123"}`
- Click Send

---

## 📚 Important Files for You

**Backend Structure**:
```
backend/
├── src/
│   ├── api/          ← API route handlers (auth, news)
│   ├── services/     ← Business logic (auth, news, sentiment)
│   ├── middleware/   ← Auth, logging, etc.
│   ├── types/        ← TypeScript interfaces
│   └── index.ts      ← Main server file
├── prisma/
│   └── schema.prisma ← Database schema
└── package.json      ← Dependencies
```

**Key Commands**:
```bash
npm run dev              # Start server (auto-reload)
npm run typecheck       # Check TypeScript errors
npm run build           # Build for production
npx prisma migrate dev  # Create database migration
npx prisma studio      # Visual database editor
```

---

## 🚀 Deployment Ready Features

These are already built, don't change them:
- ✅ JWT authentication
- ✅ Password hashing
- ✅ CORS setup
- ✅ Error handling
- ✅ TypeScript strict mode
- ✅ Database migrations
- ✅ Environment variables

---

## 📞 If You Get Stuck

**Backend won't start?**
```bash
# Check TypeScript errors
npm run typecheck

# Check if ports are available
netstat -an | findstr :3000

# Check database connection
docker-compose ps
```

**Database issue?**
```bash
# View database
npx prisma studio

# Reset database (WARNING: deletes all data)
docker-compose down
docker volume rm newsimpact_postgres_data
docker-compose up -d
npx prisma migrate dev
```

**Git issue?**
```bash
# See your changes
git status

# Pull latest changes from repo
git pull origin main

# Push your changes
git add .
git commit -m "feat: Add news API integration"
git push origin main
```

---

## 🎯 End of Week 1 Goal

If you complete Priority 1-3:
- ✅ Real news articles showing on dashboard
- ✅ Sentiment analysis working
- ✅ Users can save articles
- ✅ Stock ticker detection

This gets us **95% ready for launch**.

---

## 💪 You Got This!

You're joining at the perfect time - all the infrastructure is ready. Just build features!

**Questions?** Ask in the chat or check:
- TECHNICAL_ARCHITECTURE.md - System design
- GETTING_STARTED.md - Dev setup
- API endpoints defined in backend/src/api/

**Ready to start?** Begin with **Priority 1: News API Integration** 🚀

---

*Setup created: April 17, 2026*  
*Ready to build the future of finance* 📈
