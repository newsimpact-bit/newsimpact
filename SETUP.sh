#!/bin/bash

# ============================================================================
# MarketPulse AI - Automated Setup Script
# ============================================================================
# This script automates all the downloads and initial setup
# Run this on your local machine to get everything ready
#
# Usage: bash SETUP.sh
# ============================================================================

set -e  # Exit on error

echo "=========================================="
echo "🚀 MarketPulse AI - Automated Setup"
echo "=========================================="
echo ""

# ============================================================================
# SECTION 1: Check Prerequisites
# ============================================================================

echo "📋 SECTION 1: Checking Prerequisites..."
echo ""

check_command() {
    if command -v $1 &> /dev/null; then
        echo "✅ $2 is installed"
        return 0
    else
        echo "❌ $2 is NOT installed - Please install from $3"
        return 1
    fi
}

MISSING=0

echo "Checking required tools..."
check_command "node" "Node.js" "https://nodejs.org/en/" || MISSING=1
check_command "npm" "npm" "https://nodejs.org/en/" || MISSING=1
check_command "git" "Git" "https://git-scm.com/" || MISSING=1
check_command "docker" "Docker" "https://www.docker.com/products/docker-desktop/" || MISSING=1

echo ""
echo "Checking optional tools..."
check_command "python3" "Python" "https://www.python.org/downloads/" || true
check_command "psql" "PostgreSQL Client" "https://www.postgresql.org/download/" || true

if [ $MISSING -eq 1 ]; then
    echo ""
    echo "❌ SETUP INCOMPLETE"
    echo "Please install missing tools above, then run this script again."
    echo ""
    exit 1
fi

echo "✅ All prerequisites satisfied!"
echo ""

# ============================================================================
# SECTION 2: Create Project Directory Structure
# ============================================================================

echo "📁 SECTION 2: Creating Project Directories..."
echo ""

mkdir -p backend/{src/{api,services,models,middleware,utils},migrations,tests}
mkdir -p frontend/{src/{components,pages,hooks,store,utils,styles},public,tests}
mkdir -p ml/{sentiment,impact,training,models}
mkdir -p scripts
mkdir -p docs
mkdir -p terraform

echo "✅ Directory structure created"
echo ""

# ============================================================================
# SECTION 3: Create Essential Files
# ============================================================================

echo "📄 SECTION 3: Creating Essential Configuration Files..."
echo ""

# Create .env.example
cat > .env.example << 'EOF'
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketpulse
REDIS_URL=redis://localhost:6379

# News APIs
NEWSAPI_KEY=your_newsapi_key_here
GUARDIAN_API_KEY=your_guardian_api_key_here
YAHOO_FINANCE_KEY=optional

# Authentication
JWT_SECRET=your_super_secret_key_min_32_chars_long
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# Stripe (Phase 2)
STRIPE_SECRET_KEY=sk_test_
STRIPE_PUBLISHABLE_KEY=pk_test_
STRIPE_WEBHOOK_SECRET=whsec_

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=marketpulse-dev

# SendGrid (Email)
SENDGRID_API_KEY=your_sendgrid_key

# Environment
NODE_ENV=development
PORT=3000
FRONTEND_PORT=5173
EOF

echo "✅ .env.example created"

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/

# Environment
.env.local
.env.*.local

# Build outputs
dist/
build/
*.tgz

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Misc
.cache/
.pytest_cache/
.terraform/
*.tfstate
*.tfstate.*
EOF

echo "✅ .gitignore created"

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: marketpulse-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: marketpulse
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: marketpulse-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: marketpulse-network
EOF

echo "✅ docker-compose.yml created"

echo ""

# ============================================================================
# SECTION 4: Initialize Backend
# ============================================================================

echo "🔧 SECTION 4: Initializing Backend (Node.js)..."
echo ""

cd backend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "marketpulse-backend",
  "version": "0.1.0",
  "description": "MarketPulse AI Backend",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "migrate:up": "node scripts/migrate.js",
    "seed": "node scripts/seed.js"
  },
  "keywords": ["ai", "finance", "news", "market"],
  "author": "MarketPulse AI",
  "license": "proprietary",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "pg": "^8.9.0",
    "redis": "^4.6.5",
    "axios": "^1.3.4",
    "prisma": "^4.11.0"
  },
  "devDependencies": {
    "@types/node": "^18.15.0",
    "@types/express": "^4.17.17",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.1",
    "@typescript-eslint/eslint-plugin": "^5.57.0",
    "@typescript-eslint/parser": "^5.57.0",
    "eslint": "^8.37.0",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0"
  }
}
EOF

echo "✅ Backend package.json created"

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
EOF

echo "✅ Backend tsconfig.json created"

cd ..

echo ""

# ============================================================================
# SECTION 5: Initialize Frontend
# ============================================================================

echo "⚛️  SECTION 5: Initializing Frontend (React)..."
echo ""

cd frontend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "marketpulse-frontend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src/**/*.{ts,tsx}",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@reduxjs/toolkit": "^1.9.3",
    "react-redux": "^8.1.1",
    "axios": "^1.3.4",
    "recharts": "^2.5.0",
    "framer-motion": "^10.11.0",
    "clsx": "^1.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.2.0",
    "typescript": "^5.0.0",
    "@typescript-eslint/eslint-plugin": "^5.57.0",
    "@typescript-eslint/parser": "^5.57.0",
    "eslint": "^8.37.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.23",
    "autoprefixer": "^10.4.14"
  }
}
EOF

echo "✅ Frontend package.json created"

# Create vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
EOF

echo "✅ Frontend vite.config.ts created"

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

echo "✅ Frontend tsconfig.json created"

cd ..

echo ""

# ============================================================================
# SECTION 6: Install Dependencies
# ============================================================================

echo "📦 SECTION 6: Installing Dependencies..."
echo "   (This may take 5-10 minutes)"
echo ""

cd backend
echo "Installing backend dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1 &
BACKEND_PID=$!

cd ../frontend
echo "Installing frontend dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1 &
FRONTEND_PID=$!

wait $BACKEND_PID
echo "✅ Backend dependencies installed"

wait $FRONTEND_PID
echo "✅ Frontend dependencies installed"

cd ..

echo ""

# ============================================================================
# SECTION 7: Create GitHub Setup Instructions
# ============================================================================

echo "🔗 SECTION 7: Creating GitHub Setup Instructions..."
echo ""

cat > GITHUB_SETUP.md << 'EOF'
# GitHub Setup Instructions

## Create GitHub Organization (If Not Exists)

1. Go to github.com
2. Click "+" icon → "New organization"
3. Name: `marketpulse` (or your choice)
4. Billing email: your@email.com
5. Organization type: "Company"

## Create Repositories

### Main Repository
```bash
git init marketpulse-ai
cd marketpulse-ai
git config user.name "Jacob Greenwell"
git config user.email "your.email@gmail.com"
git branch -M main
git remote add origin https://github.com/marketpulse/marketpulse-ai.git
git add .
git commit -m "Initial commit: Project scaffold"
git push -u origin main
```

### Configure Branch Protection
1. Go to marketpulse-ai repo → Settings → Branches
2. Add rule for `main` branch
3. Require 2 pull request reviews before merging
4. Require status checks to pass before merging
5. Require branches to be up to date before merging

### Enable GitHub Actions
1. Go to repo → Actions
2. Set up basic Node.js CI workflow
3. Create `.github/workflows/test.yml`

## Add Team Members
1. Go to repo → Settings → Collaborators
2. Add: Haruto + AI team members
3. Set permissions (Admin, Maintain, Write, Triage, Read)

EOF

echo "✅ GITHUB_SETUP.md created"

echo ""

# ============================================================================
# SECTION 8: Create AWS Setup Instructions
# ============================================================================

echo "☁️  SECTION 8: Creating AWS Setup Instructions..."
echo ""

cat > AWS_SETUP.md << 'EOF'
# AWS Setup Instructions

## Create AWS Account

1. Go to aws.amazon.com
2. Click "Create AWS Account"
3. Email: your@email.com
4. Password: Strong password (save it!)
5. Account name: "marketpulse"
6. Continue with business information

## Create IAM User for Development

```bash
# In AWS Console:
1. Go to IAM → Users → Create User
2. Username: "marketpulse-dev"
3. Enable console access (optional)
4. Create access key (save CSV!)
5. Attach policies:
   - AmazonRDSFullAccess
   - AmazonS3FullAccess
   - EC2FullAccess
   - CloudWatchFullAccess
```

## Configure AWS CLI

```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure
# AWS Access Key ID: [paste from CSV]
# AWS Secret Access Key: [paste from CSV]
# Default region: us-east-1
# Default output format: json

# Verify
aws s3 ls
```

## Create RDS Database

```bash
# Via AWS Console or CLI
aws rds create-db-instance \
  --db-instance-identifier marketpulse-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password YourPassword123! \
  --allocated-storage 20 \
  --backup-retention-period 7
```

## Create S3 Bucket

```bash
aws s3 mb s3://marketpulse-dev-bucket
aws s3api put-bucket-versioning \
  --bucket marketpulse-dev-bucket \
  --versioning-configuration Status=Enabled
```

EOF

echo "✅ AWS_SETUP.md created"

echo ""

# ============================================================================
# SECTION 9: Create API Keys Reminder
# ============================================================================

echo "🔑 SECTION 9: Creating API Keys Reminder..."
echo ""

cat > API_KEYS_TODO.md << 'EOF'
# API Keys & Credentials To Obtain

## 🚨 BEFORE YOU COMMIT THESE TO GIT

1. **NewsAPI.org**
   - URL: https://newsapi.org
   - Create account → Get API key
   - Store in: `.env.local` (NOT git)
   - Cost: Free tier available

2. **Guardian API** (Optional)
   - URL: https://open-platform.theguardian.com
   - Register → Get key
   - Cost: Free

3. **AWS Credentials**
   - Create IAM user (see AWS_SETUP.md)
   - Download CSV with access keys
   - Store in: `~/.aws/credentials`
   - NEVER commit to git

4. **Stripe** (Phase 2)
   - URL: https://stripe.com
   - Create account → Get test keys
   - Store in: `.env.local`

5. **SendGrid** (Email)
   - URL: https://sendgrid.com
   - Create account → Get API key
   - Store in: `.env.local`

6. **GitHub Personal Access Token**
   - GitHub → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - Scopes: `repo`, `workflow`

## ✅ Checklist

- [ ] NewsAPI key obtained
- [ ] AWS IAM user created
- [ ] AWS CLI configured
- [ ] Guardian API key (optional)
- [ ] `.env.local` created (not committed)
- [ ] GitHub token created
- [ ] All keys stored in password manager

EOF

echo "✅ API_KEYS_TODO.md created"

echo ""

# ============================================================================
# SECTION 10: Summary
# ============================================================================

echo "=========================================="
echo "✅ SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo ""
echo "1. Review created files:"
echo "   - .env.example (copy to .env.local, fill in values)"
echo "   - .gitignore (already configured)"
echo "   - docker-compose.yml (for local dev)"
echo ""
echo "2. Obtain API keys:"
echo "   - See API_KEYS_TODO.md for checklist"
echo ""
echo "3. Start local development:"
echo "   - docker-compose up"
echo "   - cd backend && npm install && npm run dev"
echo "   - cd frontend && npm install && npm run dev"
echo ""
echo "4. Set up GitHub:"
echo "   - See GITHUB_SETUP.md for instructions"
echo ""
echo "5. Set up AWS:"
echo "   - See AWS_SETUP.md for instructions"
echo ""
echo "=========================================="
echo ""
echo "📚 Documentation:"
echo "   - GETTING_STARTED.md"
echo "   - WEEK_1_ACTION_PLAN.md"
echo "   - TECHNICAL_ARCHITECTURE.md"
echo ""
echo "Questions? Check FINAL_SUMMARY.md"
echo ""
