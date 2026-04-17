# ✅ Haruto's Setup Checklist

**Status**: Ready to begin  
**Time to complete**: ~1.5 hours

---

## 🖥️ Computer Setup (30 mins)

- [ ] **Install Node.js** (LTS version)
  - Test: `node --version` → should show v20.x or higher
  
- [ ] **Install Docker Desktop**
  - Test: `docker --version` → should show Docker version
  
- [ ] **Install Git**
  - Test: `git --version` → should show git version
  
- [ ] **Install VS Code** (optional)
  - Extensions: ES7+ React, Thunder Client, Prettier

---

## 📥 Project Setup (20 mins)

- [ ] **Clone the repository**
  ```bash
  git clone https://github.com/newsimpact-bit/newsimpact.git
  cd newsimpact
  ```

- [ ] **Install backend dependencies**
  ```bash
  cd backend
  npm install
  ```
  Test: `npm run typecheck` → should show "0 errors"

- [ ] **Copy environment file**
  ```bash
  cd C:\Users\{USERNAME}\newsimpact
  copy .env.example .env.local
  ```

- [ ] **Edit `.env.local`** with provided variables
  - DATABASE_URL
  - JWT_SECRET
  - NODE_ENV=development

---

## 🐳 Docker & Database Setup (15 mins)

- [ ] **Start Docker services**
  ```bash
  docker-compose up -d
  ```
  Test: `docker-compose ps` → should show newsimpact-db (UP) and newsimpact-redis (UP)

- [ ] **Run database migrations**
  ```bash
  cd backend
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/newsimpact" npx prisma migrate deploy
  ```
  Test: No errors shown

---

## 🚀 Start Backend (5 mins)

- [ ] **Start development server**
  ```bash
  cd backend
  npm run dev
  ```
  Test: See "🚀 NewsImpact API running on http://localhost:3000"

- [ ] **Test API is working**
  ```bash
  curl http://localhost:3000/health
  ```
  Test: See JSON response with "status":"ok"

---

## 🎯 Ready to Code!

**When ALL checkboxes above are checked:**

You can now start working on:
1. **Priority 1**: News API Integration (2-3 hours)
2. **Priority 2**: Save Articles to Database (1-2 hours)
3. **Priority 3**: Sentiment Analysis (2-3 hours)
4. **Priority 4**: Market Impact Detection (2 hours)
5. **Priority 5**: Rate Limiting & Security (1 hour)

See **HARUTO_SETUP.md** for detailed task breakdown.

---

## 🚨 If Anything Fails

| Problem | Solution |
|---------|----------|
| `node not found` | Restart Command Prompt after installing Node.js |
| `docker not found` | Docker Desktop may not be running - start it |
| `npm install fails` | Run `npm cache clean --force` then try again |
| `port 3000 in use` | Kill process: `netstat -an \| findstr :3000` |
| `database connection error` | Check `docker-compose ps` - containers must be UP |
| `prisma migration fails` | Check DATABASE_URL in .env.local matches docker-compose.yml |

---

## 📞 Questions?

- Check **HARUTO_SETUP.md** for detailed instructions
- Check **TECHNICAL_ARCHITECTURE.md** for system design
- Ask in chat if stuck

---

**Created**: April 17, 2026  
**Status**: ✅ Ready to join the team!
