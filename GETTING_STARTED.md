# MarketPulse AI - Getting Started Guide

## 🎯 Quick Start (30 minutes)

This guide gets you from zero to a working development environment.

---

## 📋 Prerequisites

- **Node.js** 18+ (`node --version`)
- **Docker** & **Docker Compose** (for database)
- **Git** (version control)
- **VS Code** or your favorite editor
- **Python** 3.9+ (for ML scripts)
- **PostgreSQL** client (`psql` command)
- **Redis** client (`redis-cli` command)

### Install Prerequisites (macOS with Homebrew)

```bash
# Node.js
brew install node

# Docker (or download Docker Desktop)
brew install --cask docker

# Python
brew install python@3.11

# PostgreSQL client
brew install postgresql

# Redis CLI
brew install redis
```

### Install Prerequisites (Windows with Chocolatey)

```bash
# Node.js
choco install nodejs

# Docker Desktop
choco install docker-desktop

# Python
choco install python

# PostgreSQL
choco install postgresql

# Redis
choco install redis
```

---

## 🚀 Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/marketpulse-ai.git
cd marketpulse-ai
```

### 2. Install Dependencies

```bash
# Backend dependencies
npm install

# Python dependencies (for ML)
pip install -r requirements.txt

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Create Environment Files

Create `.env.local` in project root:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketpulse
REDIS_URL=redis://localhost:6379

# News API
NEWSAPI_KEY=your_key_here
GUARDIAN_API_KEY=your_key_here

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# AWS (for storage/CDN)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=marketpulse-dev

# Environment
NODE_ENV=development
PORT=3000
FRONTEND_PORT=5173

# Feature Flags
ENABLE_PREMIUM_TIER=true
ENABLE_WEBSOCKETS=true
ENABLE_ANALYTICS=true
```

### 4. Start Docker Containers

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Verify containers are running
docker-compose ps
```

Expected output:
```
NAME                COMMAND                  SERVICE   STATUS
marketpulse-db     "docker-entrypoint..."   postgres  Up 2 seconds
marketpulse-redis  "redis-server"           redis     Up 2 seconds
```

### 5. Initialize Database

```bash
# Run migrations
npm run migrate:up

# Seed initial data (optional)
npm run seed:dev

# Verify database
psql postgresql://postgres:postgres@localhost:5432/marketpulse -c "\dt"
```

### 6. Start Backend Server

```bash
# Terminal 1: Start backend
npm run dev

# Expected output:
# ✓ Server running on http://localhost:3000
# ✓ Connected to PostgreSQL
# ✓ Connected to Redis
# ✓ News ingestion service started
```

### 7. Start Frontend (in another terminal)

```bash
# Terminal 2: Start frontend
cd frontend
npm run dev

# Expected output:
# ✓ Vite dev server running at http://localhost:5173
```

### 8. Verify Everything Works

Open your browser:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api/v1/health
- **API Docs**: http://localhost:3000/api/docs

Expected response from API health check:
```json
{
  "status": "healthy",
  "timestamp": "2026-04-17T10:30:00Z",
  "database": "connected",
  "redis": "connected",
  "version": "0.1.0"
}
```

---

## 📁 Project Structure

```
marketpulse-ai/
├── backend/
│   ├── src/
│   │   ├── api/              # API endpoints
│   │   ├── services/         # Business logic
│   │   ├── models/           # Database models
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Utilities
│   │   └── index.ts          # Entry point
│   ├── migrations/           # Database migrations
│   ├── seeds/                # Test data
│   ├── tests/                # Unit & integration tests
│   ├── .env.local            # Local environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── docker-compose.yml
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # Redux store
│   │   ├── utils/            # Utilities
│   │   ├── styles/           # Tailwind CSS
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── tests/
│   ├── .env.local
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── ml/
│   ├── sentiment/            # Sentiment analysis models
│   ├── impact/               # Market impact models
│   ├── training/             # Training scripts
│   ├── models/               # Model artifacts
│   ├── requirements.txt
│   └── scripts/
├── scripts/
│   ├── ingest-news.js        # News ingestion script
│   ├── analyze-sentiment.py  # Sentiment analysis
│   ├── migrate.js            # Database migrations
│   └── seed.js               # Seed database
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
├── docker-compose.yml
├── package.json
├── README.md
└── .gitignore
```

---

## 🧪 Running Tests

### Backend Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage

# Watch mode (rerun on file change)
npm run test:watch
```

### Frontend Tests

```bash
cd frontend
npm run test
npm run test:coverage
npm run test:watch
```

### E2E Tests (Cypress)

```bash
# Open Cypress GUI
npm run test:e2e

# Or run in CI mode
npm run test:e2e:ci
```

---

## 📝 Code Style & Linting

### Auto-Format Code

```bash
# Backend
npm run lint:fix

# Frontend
cd frontend
npm run lint:fix
```

### Code Quality Checks

```bash
# ESLint (style violations)
npm run lint

# TypeScript (type checking)
npm run typecheck

# Security (vulnerable dependencies)
npm audit

# Code complexity
npm run complexity
```

---

## 🐛 Debugging

### Backend Debugging

```bash
# Start with Node debugger
npm run dev:debug

# Use VS Code debugger:
# 1. Set breakpoint in code
# 2. Press F5 to debug
# 3. Breakpoint will pause execution
```

### Frontend Debugging

```bash
# Use Chrome DevTools:
# 1. Open http://localhost:5173
# 2. Press F12
# 3. Set breakpoints in Sources tab
```

### Database Debugging

```bash
# Connect to PostgreSQL
psql postgresql://postgres:postgres@localhost:5432/marketpulse

# Useful queries
\dt                          # List tables
\d articles                  # Describe table
SELECT COUNT(*) FROM articles;  # Count rows
```

### Redis Debugging

```bash
# Connect to Redis
redis-cli

# Useful commands
KEYS *                       # List all keys
GET key_name                 # Get value
MONITOR                      # Watch commands
FLUSHDB                      # Clear database (dev only!)
```

---

## 🚀 Building for Production

### Backend Build

```bash
npm run build

# Verify build
npm run start

# Expected output:
# ✓ Server running on http://localhost:3000 (production mode)
```

### Frontend Build

```bash
cd frontend
npm run build

# Output: dist/ directory with optimized assets
```

### Docker Build

```bash
# Build Docker images
docker build -t marketpulse-backend:latest ./backend
docker build -t marketpulse-frontend:latest ./frontend

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up
```

---

## 📚 API Development

### Creating a New API Endpoint

1. **Create controller** (`src/api/controllers/news.controller.ts`):

```typescript
import { Router, Request, Response } from 'express';
import { newsService } from '../services';

const router = Router();

// GET /api/v1/news/recent
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const articles = await newsService.getRecentArticles({
      limit: req.query.limit as string,
      offset: req.query.offset as string,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

2. **Create service** (`src/services/news.service.ts`):

```typescript
import { Article } from '../models/Article';

export class NewsService {
  async getRecentArticles(params: { limit: string; offset: string }) {
    const articles = await Article.find()
      .limit(parseInt(params.limit) || 10)
      .offset(parseInt(params.offset) || 0)
      .orderBy('publishedAt', 'DESC');
    return articles;
  }
}

export const newsService = new NewsService();
```

3. **Register route** (`src/api/index.ts`):

```typescript
import newsRouter from './controllers/news.controller';

app.use('/api/v1/news', newsRouter);
```

4. **Test endpoint**:

```bash
curl http://localhost:3000/api/v1/news/recent?limit=10
```

---

## 🔄 Working with Git

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/sentiment-analysis

# Make changes and commit
git add .
git commit -m "Add sentiment analysis endpoint"

# Push to remote
git push origin feature/sentiment-analysis

# Create Pull Request on GitHub
# After review and approval, merge to main
```

### Commit Message Convention

```
feat: Add sentiment analysis endpoint
fix: Correct sentiment score calculation
docs: Update API documentation
style: Format code with Prettier
test: Add unit tests for sentiment service
refactor: Simplify news ingestion logic
chore: Update dependencies
```

### Keeping Fork Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/original-org/marketpulse-ai.git

# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main
```

---

## 🚨 Common Issues & Solutions

### Issue: "Database connection failed"

**Solution**:
```bash
# Check PostgreSQL container
docker-compose logs postgres

# Restart containers
docker-compose restart

# Verify connection
psql postgresql://postgres:postgres@localhost:5432/marketpulse -c "SELECT 1"
```

### Issue: "Port 3000 already in use"

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: "Redis connection refused"

**Solution**:
```bash
# Check Redis container
docker-compose logs redis

# Restart Redis
docker-compose restart redis

# Verify connection
redis-cli ping
```

### Issue: "TypeScript compilation errors"

**Solution**:
```bash
# Check types
npm run typecheck

# Rebuild types
npm run build

# Clear cache
rm -rf node_modules/.cache
npm install
```

---

## 📖 Next Steps

1. **Read the Architecture Guide**: [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)
2. **Review API Documentation**: http://localhost:3000/api/docs
3. **Check Database Schema**: Run `npm run schema:describe`
4. **Start a Task**: Pick a task from GitHub Projects
5. **Ask Questions**: Slack @haruto or @product-team

---

## 💬 Getting Help

- **Slack**: #marketpulse-dev
- **GitHub Issues**: Create an issue if you find a bug
- **Weekly Standup**: Monday 10am PT
- **Pair Programming**: Schedule with team lead

---

## ✅ First-Time Contributor Checklist

- [ ] Cloned repository
- [ ] Installed dependencies
- [ ] Set up `.env.local`
- [ ] Started Docker containers
- [ ] Ran database migrations
- [ ] Started backend (`npm run dev`)
- [ ] Started frontend (`npm run dev` in frontend/)
- [ ] Visited http://localhost:5173
- [ ] Created a feature branch
- [ ] Made a small change (add console.log)
- [ ] Committed and pushed changes
- [ ] Created a Pull Request
- [ ] Got approval and merged
- [ ] Celebrated! 🎉

---

## 🎓 Learning Resources

- **Node.js**: https://nodejs.org/en/docs/
- **Express.js**: https://expressjs.com/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Docker**: https://docs.docker.com/
- **Git**: https://git-scm.com/book/en/v2

---

## 📞 Team Contacts

| Role | Name | Slack | Email |
|------|------|-------|-------|
| Product Lead | You | @you | you@marketpulse.ai |
| Technical Lead | Haruto | @haruto | haruto@marketpulse.ai |
| Architecture | Architecture Agent | #architecture | arch@marketpulse.ai |
| News Pipeline | Pipeline Agent | #news-pipeline | pipeline@marketpulse.ai |
| AI/ML | ML Agent | #ml-team | ml@marketpulse.ai |
| Frontend | Frontend Agent | #frontend | frontend@marketpulse.ai |
| Compliance | Security Agent | #compliance | compliance@marketpulse.ai |
| DevOps | DevOps Agent | #devops | devops@marketpulse.ai |

---

**Happy coding! 🚀**
