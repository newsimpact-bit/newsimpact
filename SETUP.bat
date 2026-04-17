@echo off
REM ============================================================================
REM MarketPulse AI - Automated Setup Script (Windows)
REM ============================================================================
REM This script automates all downloads and initial setup on Windows
REM
REM Run: SETUP.bat
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo 🚀 MarketPulse AI - Windows Setup
echo ==========================================
echo.

REM ============================================================================
REM SECTION 1: Check Prerequisites
REM ============================================================================

echo 📋 SECTION 1: Checking Prerequisites...
echo.

set MISSING=0

REM Check Node.js
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is NOT installed
    echo    Download from: https://nodejs.org/en/
    set MISSING=1
) else (
    echo ✅ Node.js is installed
)

REM Check npm
npm --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ npm is NOT installed
    echo    Download from: https://nodejs.org/en/
    set MISSING=1
) else (
    echo ✅ npm is installed
)

REM Check Git
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Git is NOT installed
    echo    Download from: https://git-scm.com/
    set MISSING=1
) else (
    echo ✅ Git is installed
)

REM Check Docker
docker --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Docker is NOT installed
    echo    Download from: https://www.docker.com/products/docker-desktop/
    set MISSING=1
) else (
    echo ✅ Docker is installed
)

REM Check Python (optional)
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Python is optional (not found)
) else (
    echo ✅ Python is installed
)

echo.

if %MISSING% equ 1 (
    echo ❌ SETUP INCOMPLETE
    echo Please install missing tools above, then run this script again.
    echo.
    pause
    exit /b 1
)

echo ✅ All prerequisites satisfied!
echo.

REM ============================================================================
REM SECTION 2: Create Project Directory Structure
REM ============================================================================

echo 📁 SECTION 2: Creating Project Directories...
echo.

if not exist backend\src\api mkdir backend\src\api
if not exist backend\src\services mkdir backend\src\services
if not exist backend\src\models mkdir backend\src\models
if not exist backend\src\middleware mkdir backend\src\middleware
if not exist backend\src\utils mkdir backend\src\utils
if not exist backend\migrations mkdir backend\migrations
if not exist backend\tests mkdir backend\tests

if not exist frontend\src\components mkdir frontend\src\components
if not exist frontend\src\pages mkdir frontend\src\pages
if not exist frontend\src\hooks mkdir frontend\src\hooks
if not exist frontend\src\store mkdir frontend\src\store
if not exist frontend\src\utils mkdir frontend\src\utils
if not exist frontend\src\styles mkdir frontend\src\styles
if not exist frontend\public mkdir frontend\public
if not exist frontend\tests mkdir frontend\tests

if not exist ml\sentiment mkdir ml\sentiment
if not exist ml\impact mkdir ml\impact
if not exist ml\training mkdir ml\training
if not exist ml\models mkdir ml\models

if not exist scripts mkdir scripts
if not exist docs mkdir docs
if not exist terraform mkdir terraform

echo ✅ Directory structure created
echo.

REM ============================================================================
REM SECTION 3: Create Essential Files
REM ============================================================================

echo 📄 SECTION 3: Creating Essential Configuration Files...
echo.

REM Create .env.example
(
echo # Database
echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketpulse
echo REDIS_URL=redis://localhost:6379
echo.
echo # News APIs
echo NEWSAPI_KEY=your_newsapi_key_here
echo GUARDIAN_API_KEY=your_guardian_api_key_here
echo.
echo # Authentication
echo JWT_SECRET=your_super_secret_key_min_32_chars_long
echo JWT_EXPIRE=15m
echo REFRESH_TOKEN_EXPIRE=7d
echo.
echo # Stripe
echo STRIPE_SECRET_KEY=sk_test_
echo STRIPE_PUBLISHABLE_KEY=pk_test_
echo.
echo # AWS
echo AWS_REGION=us-east-1
echo AWS_ACCESS_KEY_ID=your_key
echo AWS_SECRET_ACCESS_KEY=your_secret
echo.
echo # SendGrid
echo SENDGRID_API_KEY=your_sendgrid_key
echo.
echo # Environment
echo NODE_ENV=development
echo PORT=3000
echo FRONTEND_PORT=5173
) > .env.example

echo ✅ .env.example created

REM Create .gitignore
(
echo # Dependencies
echo node_modules/
echo __pycache__/
echo *.pyc
echo venv/
echo.
echo # Environment
echo .env.local
echo .env.*.local
echo.
echo # Build
echo dist/
echo build/
echo.
echo # IDE
echo .vscode/
echo .idea/
echo *.swp
echo.
echo # OS
echo .DS_Store
echo Thumbs.db
echo.
echo # Logs
echo logs/
echo *.log
echo.
echo # Misc
echo .cache/
echo .terraform/
) > .gitignore

echo ✅ .gitignore created

REM Create docker-compose.yml
(
echo version: '3.8'
echo.
echo services:
echo   postgres:
echo     image: postgres:15-alpine
echo     container_name: marketpulse-db
echo     environment:
echo       POSTGRES_USER: postgres
echo       POSTGRES_PASSWORD: postgres
echo       POSTGRES_DB: marketpulse
echo     ports:
echo       - "5432:5432"
echo     volumes:
echo       - postgres_data:/var/lib/postgresql/data
echo.
echo   redis:
echo     image: redis:7-alpine
echo     container_name: marketpulse-redis
echo     ports:
echo       - "6379:6379"
echo     volumes:
echo       - redis_data:/data
echo.
echo volumes:
echo   postgres_data:
echo   redis_data:
) > docker-compose.yml

echo ✅ docker-compose.yml created
echo.

REM ============================================================================
REM SECTION 4: Initialize Backend
REM ============================================================================

echo 🔧 SECTION 4: Initializing Backend...
echo.

cd backend

REM Create package.json
(
echo {
echo   "name": "marketpulse-backend",
echo   "version": "0.1.0",
echo   "description": "MarketPulse AI Backend",
echo   "main": "dist/index.js",
echo   "scripts": {
echo     "dev": "ts-node src/index.ts",
echo     "build": "tsc",
echo     "start": "node dist/index.js",
echo     "test": "jest",
echo     "lint": "eslint src/**/*.ts"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "cors": "^2.8.5",
echo     "dotenv": "^16.0.3",
echo     "jsonwebtoken": "^9.0.0",
echo     "bcrypt": "^5.1.0",
echo     "pg": "^8.9.0",
echo     "redis": "^4.6.5",
echo     "axios": "^1.3.4"
echo   },
echo   "devDependencies": {
echo     "@types/node": "^18.15.0",
echo     "@types/express": "^4.17.17",
echo     "typescript": "^5.0.0",
echo     "ts-node": "^10.9.1",
echo     "eslint": "^8.37.0"
echo   }
echo }
) > package.json

echo ✅ Backend package.json created

REM Create tsconfig.json
(
echo {
echo   "compilerOptions": {
echo     "target": "ES2020",
echo     "module": "commonjs",
echo     "lib": ["ES2020"],
echo     "outDir": "./dist",
echo     "rootDir": "./src",
echo     "strict": true,
echo     "esModuleInterop": true,
echo     "skipLibCheck": true
echo   },
echo   "include": ["src/**/*"],
echo   "exclude": ["node_modules", "dist"]
echo }
) > tsconfig.json

echo ✅ Backend tsconfig.json created

cd ..
echo.

REM ============================================================================
REM SECTION 5: Initialize Frontend
REM ============================================================================

echo ⚛️  SECTION 5: Initializing Frontend...
echo.

cd frontend

REM Create package.json
(
echo {
echo   "name": "marketpulse-frontend",
echo   "version": "0.1.0",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview",
echo     "lint": "eslint src/**/*.{ts,tsx}"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "@reduxjs/toolkit": "^1.9.3",
echo     "react-redux": "^8.1.1",
echo     "axios": "^1.3.4",
echo     "recharts": "^2.5.0",
echo     "framer-motion": "^10.11.0"
echo   },
echo   "devDependencies": {
echo     "@types/react": "^18.0.28",
echo     "@types/react-dom": "^18.0.11",
echo     "@vitejs/plugin-react": "^3.1.0",
echo     "vite": "^4.2.0",
echo     "typescript": "^5.0.0",
echo     "tailwindcss": "^3.3.0"
echo   }
echo }
) > package.json

echo ✅ Frontend package.json created

cd ..
echo.

REM ============================================================================
REM SECTION 6: Install Dependencies
REM ============================================================================

echo 📦 SECTION 6: Installing Dependencies...
echo    (This may take 5-10 minutes^)
echo.

cd backend
echo Installing backend dependencies...
call npm install --legacy-peer-deps
cd..

cd frontend
echo Installing frontend dependencies...
call npm install --legacy-peer-deps
cd..

echo.
echo ✅ Dependencies installed
echo.

REM ============================================================================
REM SECTION 7: Summary
REM ============================================================================

echo ==========================================
echo ✅ SETUP COMPLETE!
echo ==========================================
echo.
echo Next Steps:
echo.
echo 1. Copy .env.example to .env.local
echo    - Fill in your API keys
echo    - NEVER commit .env.local to git
echo.
echo 2. Obtain API keys:
echo    - NewsAPI.org (https://newsapi.org^)
echo    - Guardian API (https://open-platform.theguardian.com^)
echo    - Stripe (https://stripe.com^)
echo.
echo 3. Start Docker containers:
echo    - docker-compose up
echo.
echo 4. Start development servers:
echo    - Backend: cd backend ^&^& npm run dev
echo    - Frontend: cd frontend ^&^& npm run dev
echo.
echo 5. Set up GitHub:
echo    - Create new repo on GitHub
echo    - git init
echo    - git add .
echo    - git commit -m "Initial commit"
echo    - git remote add origin [your-repo-url]
echo    - git push -u origin main
echo.
echo ==========================================
echo.
echo 📚 Documentation:
echo    - README.md
echo    - GETTING_STARTED.md
echo    - TECHNICAL_ARCHITECTURE.md
echo.
echo Questions? Check FINAL_SUMMARY.md
echo.

pause
