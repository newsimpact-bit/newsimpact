# ✅ MarketPulse AI - Pre-Launch Checklist (Do These NOW!)

## ⏰ Timeline
**Completion Target**: Before Monday 10am Standup (Week 1)  
**Time Required**: 8-10 hours total  
**Who**: You + Haruto (split the work)

---

## 📋 SECTION A: IMMEDIATE (This Week - 2-3 Hours)

### A.1 Company Formation (You or Haruto - 1 hour)

#### Legal Setup
- [ ] **Form LLC/C-Corp** (if not already done)
  - Use: Stripe Atlas, Clerky, or local attorney
  - Cost: $500-2000
  - Timeline: 1-5 days
  - *Assignment:* You or Haruto?

- [ ] **Obtain EIN** (Employer Identification Number)
  - Apply: IRS.gov (free, takes ~10 mins)
  - Needed for: Banking, taxes, hiring
  - *Assignment:* You

- [ ] **Open business bank account**
  - Use: Stripe Account (for payments) + Mercury/Brex (for operating account)
  - Cost: Free
  - Needed: EIN, business license, personal ID
  - *Assignment:* You

- [ ] **Register domain name**
  - Domain: marketpulse.ai (or alternatives?)
  - Registrar: Namecheap, GoDaddy, Route53 (AWS)
  - Cost: $10-15/year
  - DNS: Point to website host
  - *Assignment:* Haruto (technical)

- [ ] **Set up basic website/landing page**
  - Use: Simple HTML + GitHub Pages, or Webflow
  - Goal: Explain what MarketPulse is
  - Include: Coming Soon, Email signup
  - Cost: Free ($0) to $50/month
  - *Assignment:* Frontend Agent (Haruto oversight)

#### Certificates & Licenses
- [ ] **Check if you need securities license** (SEC/FINRA)
  - Question: "Are we regulated as an investment advisor?"
  - Research: SEC Investment Advisers Act
  - Hire: Securities attorney (Week A.2)
  - *Assignment:* Compliance Agent

### A.2 Legal & Compliance Review (2 hours)

**CRITICAL**: You must get legal review before launch. Budget $5-10K for this.

#### Hire Securities Attorney (ASAP!)
- [ ] **Find attorney who specializes in:**
  - FinTech / Investment platforms
  - SEC/FINRA regulations
  - Startups (affordable)

- [ ] **Interview 2-3 firms**, get quotes
  - Estimate: $5-15K for startup review
  - Timeline: 1-2 weeks turnaround
  - Look for: Contingency options, hourly rates under $300

- [ ] **Provide them:**
  - Business plan (README.md)
  - Disclaimers (COMPLIANCE_FRAMEWORK.md)
  - Terms of Service (draft)
  - Privacy Policy (draft)

- [ ] **Get written legal opinion on:**
  - ✅ "Are we compliant with securities laws?"
  - ✅ "Do disclaimers sufficiently protect us?"
  - ✅ "Are we violating any investment advisor rules?"
  - ✅ "Any GDPR/CCPA issues?"

#### Preliminary Compliance Review
- [ ] **Review COMPLIANCE_FRAMEWORK.md** yourself
  - Read: "Core Principles" section
  - Understand: What you can/cannot do legally

- [ ] **Copy disclaimers** to your UI mockups
  - Every page must show: "Not financial advice"
  - Prominent, visible, bold text
  - *Assignment:* Frontend Agent

- [ ] **Draft (but don't finalize) Terms of Service**
  - Use template: COMPLIANCE_FRAMEWORK.md
  - Will be finalized by attorney

---

## 🔧 SECTION B: Technical Setup (This Week - 3-4 Hours)

### B.1 Development Environment Setup (Haruto + Agents)

#### GitHub Repository
- [ ] **Create GitHub organization** (if not exists)
  - Name: your-company or marketpulse
  - Owner: Haruto
  - Make private initially

- [ ] **Create GitHub repositories:**
  - [ ] `marketpulse-ai` (main repo)
  - [ ] `marketpulse-docs` (documentation)
  - [ ] `marketpulse-ml` (ML models, private)
  - [ ] `marketpulse-infra` (Terraform, private)

- [ ] **Configure GitHub:**
  - [ ] Add all team members
  - [ ] Set branch protection on `main`
  - [ ] Require 2 reviews for PRs
  - [ ] Require status checks (tests) to pass
  - [ ] Create GitHub Projects board (Kanban)

- [ ] **GitHub Project Board setup:**
  - [ ] Create columns: Backlog, In Progress, Review, Done
  - [ ] Add Week 1 tasks from IMPLEMENTATION_ROADMAP.md
  - [ ] Assign tasks to agents

#### AWS Account Setup
- [ ] **Create AWS account** (Haruto)
  - Use: Personal account or business email
  - Cost: $0 for free tier
  - Verify phone number & credit card

- [ ] **Set up AWS organizations** (if multiple accounts needed)
  - Create: Dev, Staging, Prod accounts
  - Cost: $0 (organizational feature)

- [ ] **Configure AWS IAM** (permissions)
  - Create user: `marketpulse-dev` for local development
  - Create user: `marketpulse-ci` for GitHub Actions
  - Create policies: Minimal permissions (least privilege)
  - Generate: Access keys & store in 1Password/LastPass

- [ ] **Set up AWS billing alerts**
  - Budget: $1000/month
  - Alert when: Exceeds $100, $500, $1000
  - Assign to: You (product) + Haruto (technical)

- [ ] **Enable AWS Cost Explorer**
  - Track spending daily
  - Set budget warnings

#### Local Development Setup
- [ ] **Install prerequisites** (see GETTING_STARTED.md)
  - [ ] Node.js 18+
  - [ ] Docker & Docker Compose
  - [ ] Python 3.9+
  - [ ] PostgreSQL client
  - [ ] Redis CLI
  - [ ] Git

- [ ] **Create development secrets management**
  - [ ] 1Password or LastPass subscription ($40-70/year)
  - [ ] Share: `.env.example` (no secrets)
  - Store: Actual `.env.local` in password manager
  - Never: Commit `.env.local` to Git

- [ ] **Scaffold initial project structure**
  - See: TECHNICAL_ARCHITECTURE.md (Directory Structure)
  - Create: Directories for backend/, frontend/, ml/, docs/
  - Commit: Initial README.md + .gitignore

### B.2 Cloud Infrastructure Scaffolding (Haruto + DevOps Agent)

#### Docker Setup
- [ ] **Create docker-compose.yml** for local development
  - Services: PostgreSQL, Redis, Backend, Frontend (optional)
  - Networks: Default compose network
  - Volumes: Data persistence for postgres/redis
  - See: TECHNICAL_ARCHITECTURE.md (Data Architecture)

- [ ] **Create Dockerfiles** (stubs)
  - Backend: `backend/Dockerfile` (Node.js base)
  - Frontend: `frontend/Dockerfile` (Node.js build + nginx)
  - ML: `ml/Dockerfile` (Python base)
  - Note: Fill in later, just create skeleton

#### Infrastructure-as-Code
- [ ] **Initialize Terraform** (infrastructure scaffolding)
  - Root: `./terraform/` directory
  - Providers: AWS
  - Modules: VPC, RDS, S3, CloudFront (stubs)
  - State: Store in S3 (configure after)

- [ ] **Create terraform/main.tf** with:
  - [ ] AWS provider configuration
  - [ ] Backend for Terraform state (S3)
  - [ ] Variables file (terraform.tfvars)
  - [ ] Outputs (IPs, endpoints, ARNs)

#### CI/CD Pipeline (GitHub Actions)
- [ ] **Create `.github/workflows/` directory**
  - [ ] `test.yml` - Run tests on PR
  - [ ] `deploy-staging.yml` - Deploy to staging on merge to main
  - [ ] `deploy-prod.yml` - Manual production deployment
  - Reference: IMPLEMENTATION_ROADMAP.md (Week 1 DevOps)

- [ ] **Create deployment scripts**
  - [ ] `scripts/deploy-staging.sh`
  - [ ] `scripts/deploy-prod.sh`
  - [ ] `scripts/migrate-db.sh`
  - [ ] `scripts/seed-db.sh`

---

## 🎯 SECTION C: Product Definition (This Week - 2-3 Hours)

### C.1 Feature Finalization

#### Answer STARTUP_QUESTIONNAIRE.md
- [ ] **Complete all sections:**
  - Section 1: Business & Product
  - Section 2: Pricing & Revenue
  - Section 3: Technical Decisions
  - Section 4: Cloud & DevOps
  - Section 5-13: Other sections

- [ ] **Resolve any ambiguities:**
  - Ask: "Should we do X or Y?"
  - Document: Why you chose X

- [ ] **Print & sign off:**
  - Both founders review & agree
  - Save: Questionnaire_Completed_2026-04-17.md

#### MVP Feature Lock
- [ ] **Create feature list:**
  - MUST HAVE (for Week 4 launch)
  - NICE-TO-HAVE (Week 5-8)
  - OUT OF SCOPE (don't do)
  - See: STARTUP_QUESTIONNAIRE.md Section 1.4

- [ ] **Estimate effort for each:**
  - Small (1-2 days), Medium (3-5 days), Large (1+ week)
  - Total: Should fit in 4 weeks

- [ ] **Create GitHub milestones:**
  - Milestone: MVP (Week 4)
  - Milestone: Growth (Week 8)
  - Milestone: Scaling (Week 12)

### C.2 User Stories & Acceptance Criteria

#### Create initial user stories:
- [ ] **Story 1: View News Feed**
  - As a user, I want to see latest financial news
  - So that I can stay updated on market movements
  - Acceptance criteria:
    - [ ] Display 10-20 latest articles
    - [ ] Show headline, source, timestamp
    - [ ] Mobile responsive
    - [ ] < 2s load time

- [ ] **Story 2: Search News**
  - As a user, I want to search for news by keyword
  - So that I can find relevant information
  - Acceptance criteria:
    - [ ] Search by company name, ticker, keyword
    - [ ] Show matching results
    - [ ] Pagination support

- [ ] **Story 3: Create Account** (if auth required)
  - As a user, I want to create an account
  - So that I can save preferences and watchlists
  - Acceptance criteria:
    - [ ] Email signup form
    - [ ] Email verification
    - [ ] Profile page

- [ ] **Create 5-10 more stories** for MVP features
  - Use template above
  - Add acceptance criteria
  - Size each story (S/M/L)

#### Add stories to GitHub Issues
- [ ] **Create GitHub issue for each story**
  - Label: `type/feature` or `type/bug`
  - Milestone: `MVP`
  - Estimate: S (1 pt), M (3 pts), L (5 pts)
  - Assign to: Relevant agent

---

## 📢 SECTION D: Communication Setup (3-4 Hours)

### D.1 Slack Workspace
- [ ] **Create Slack workspace** (if not exists)
  - Workspace name: marketpulse
  - Admin: You + Haruto

- [ ] **Create channels:**
  - [ ] `#general` - Company updates
  - [ ] `#standup` - Daily standups
  - [ ] `#architecture` - Architecture discussions
  - [ ] `#news-pipeline` - News agent updates
  - [ ] `#ml-team` - AI/ML discussions
  - [ ] `#frontend` - Frontend dev
  - [ ] `#compliance` - Legal/compliance
  - [ ] `#devops` - Infrastructure
  - [ ] `#product` - Product strategy
  - [ ] `#random` - Non-work chat
  - [ ] `#announcements` - Important news
  - [ ] `#dev-help` - Quick questions

- [ ] **Set channel descriptions & purposes**
  - Example: `#standup` = "Daily 10am PT team updates"

- [ ] **Invite all team members**
  - Haruto, all 6 AI agents, advisors
  - Set: Slack notifications preferences

- [ ] **Create Slack bot** (optional)
  - Use: GitHub + Slack integration
  - Notify: When PRs created, merged, issues assigned

### D.2 Email Setup
- [ ] **Create company email address**
  - Email: you@marketpulse.ai
  - Provider: Google Workspace ($6/month) or custom domain
  - Set up: Calendar, Docs, Drive access

- [ ] **Create shared email accounts:**
  - [ ] support@marketpulse.ai (for customer inquiries)
  - [ ] noreply@marketpulse.ai (for automated emails)
  - [ ] team@marketpulse.ai (team-wide)
  - [ ] founders@marketpulse.ai (you + Haruto)

- [ ] **Set up email forwarding:**
  - support@ → Haruto + You
  - team@ → All agents
  - founders@ → You + Haruto only

### D.3 Calendar & Meetings
- [ ] **Create shared Google Calendar**
  - Add: Team members
  - Create recurring: Monday 10am PT standup
  - Set: Zoom/Google Meet link
  - Duration: 1 hour (standup format from README.md)

- [ ] **Schedule first standup:**
  - Date: Monday (Week 1)
  - Time: 10:00 AM PT
  - Attendees: You, Haruto, all 6 agents
  - Agenda:
    1. Welcome & introduction
    2. Review vision (PROJECT_CHARTER.md)
    3. Review team structure (AI_TEAM_STRUCTURE.md)
    4. Q&A
    5. Assign Week 1 tasks

- [ ] **Create sprint planning meeting** (optional)
  - Every 2 weeks: Monday 10am PT
  - Duration: 1 hour
  - Attendees: Same

- [ ] **Create sprint review** (optional)
  - Every 2 weeks: Friday 2pm PT
  - Duration: 1 hour
  - Demo: What was built this sprint

---

## 📊 SECTION E: Documentation & Planning (2-3 Hours)

### E.1 Project Documentation
- [ ] **Copy all docs to shared location:**
  - [ ] Google Drive folder: "MarketPulse AI"
  - [ ] Or: GitHub `wiki/` directory
  - Share with: All team members (view access)

- [ ] **Create master checklist:**
  - Copy IMPLEMENTATION_ROADMAP.md to GitHub
  - Create issues for each task
  - Assign to agents

- [ ] **Create decision log:**
  - Document: Key decisions and why
  - Example:
    ```
    Decision: Use PostgreSQL not MongoDB
    Date: 2026-04-17
    Owner: Haruto
    Why: SQL queries for complex reporting, ACID compliance
    Alternative Rejected: MongoDB (flexible schema, but overkill)
    ```

### E.2 Onboarding Materials
- [ ] **Create Agent Onboarding Package** (for each agent)
  - Documents to read:
    1. README.md (15 min)
    2. AI_TEAM_STRUCTURE.md (15 min) - their role
    3. Relevant technical docs (30 min)
  - Setup instructions: GETTING_STARTED.md
  - First task assignment: From GitHub Project board

- [ ] **Create "Day 1 Checklist" for each agent:**
  ```
  [ ] Read README.md
  [ ] Read your role in AI_TEAM_STRUCTURE.md
  [ ] Slack intro to team
  [ ] Set up local development
  [ ] Clone GitHub repo
  [ ] Create first feature branch
  [ ] Post screenshot of local setup in #dev-help
  ```

### E.3 Architecture Review
- [ ] **Haruto reviews TECHNICAL_ARCHITECTURE.md:**
  - Any changes? Update document
  - Any questions? Create GitHub issues
  - Confirm: Tech stack is final

- [ ] **Finalize API design:**
  - REST endpoints (see TECHNICAL_ARCHITECTURE.md)
  - API versioning (v1, v2, etc.)
  - Request/response formats (JSON)
  - Error handling (HTTP status codes)
  - Rate limiting (per tier)

- [ ] **Finalize database schema:**
  - Tables: User, Article, Sentiment, Impact, etc.
  - Relationships: Foreign keys, indexes
  - Migrations: How to evolve schema over time

---

## 💰 SECTION F: Financial & Budget (1-2 Hours)

### F.1 Budget Finalization
- [ ] **Complete financial projections:**
  - Monthly costs (cloud, APIs, tools, salary)
  - Monthly revenue (conservative estimate)
  - Runway (months until $ runs out)
  - Break-even point

- [ ] **Monthly expense breakdown:**
  ```
  Cloud Infrastructure (AWS):     $300-500
  News APIs:                      $150
  Monitoring (Datadog):           Free tier / $200
  Development tools (GitHub, etc): $50
  Legal/Compliance:               $200 (allocated)
  Marketing:                      $0 (organic only, MVP)
  ─────────────────────────────────────
  Total:                          ~$700-1100/month
  ```

- [ ] **Funding runway:**
  - Bootstrapped budget: $10,000
  - Monthly burn: $1000
  - Runway: ~10 months
  - Plan: Profitability or funding by Month 6

### F.2 Stripe Account
- [ ] **Create Stripe account**
  - Website: stripe.com
  - Verify: Email, phone, business info
  - Cost: Free (pay per transaction)

- [ ] **Set up Stripe products/pricing:**
  - Product: "Premium Monthly" ($9.99/month)
  - Product: "Premium Annual" ($99.99/year, 15% discount)
  - Set: Billing portal for customer management

- [ ] **Configure Stripe webhooks:**
  - Endpoint: https://api.marketpulse.ai/webhooks/stripe
  - Events: invoice.paid, customer.created, subscription.deleted
  - Note: Implement in Week 2

- [ ] **Get Stripe API keys:**
  - Publishable: pk_test_...
  - Secret: sk_test_... (store in 1Password!)
  - Add to: `.env.local` (never commit)

---

## 🔐 SECTION G: Security Basics (1-2 Hours)

### G.1 Secrets Management
- [ ] **Sign up for 1Password or LastPass**
  - Cost: $3/month per person
  - Create team: Invite Haruto

- [ ] **Store secrets:**
  - AWS access keys
  - Database passwords
  - Stripe API keys
  - NewsAPI key
  - All API credentials
  - Never store in Git or Slack!

- [ ] **Create `.env.example`** (no secrets)
  ```
  DATABASE_URL=postgresql://...EXAMPLE...
  STRIPE_SECRET_KEY=sk_test_XXXXX
  JWT_SECRET=your_secret_key_here
  ```

- [ ] **Create `.gitignore`:**
  ```
  .env.local
  .env*.local
  node_modules/
  dist/
  build/
  .DS_Store
  *.swp
  .vscode/settings.json
  ```

### G.2 GitHub Security
- [ ] **Enable branch protection:**
  - Require 2 PR reviews
  - Require CI/CD checks pass
  - Dismiss stale PR reviews
  - Require status checks before merge

- [ ] **Add CODEOWNERS file** (enforces reviews)
  ```
  # Example
  * @haruto  # Require Haruto's review
  /backend/ @haruto-backend-team
  /frontend/ @frontend-agent
  /compliance/ @compliance-agent
  ```

- [ ] **Enable GitHub security scanning:**
  - [ ] Dependabot (auto-updates dependencies)
  - [ ] Secret scanning (catch leaked keys)
  - [ ] Code scanning (SAST - static analysis)

---

## ✨ SECTION H: Nice-to-Have (Do if Time)

### H.1 Monitoring & Observability
- [ ] **Sign up for Datadog** (optional for MVP)
  - Free tier: Sufficient for startup
  - Later: Upgrade to paid for APM

- [ ] **Set up basic logging:**
  - Use: CloudWatch or ELK Stack
  - Log: All API requests, errors, warnings
  - Retention: 1 week initially

### H.2 Marketing Site
- [ ] **Create landing page:**
  - Domain: marketpulse.ai
  - Host: Vercel, Netlify, or GitHub Pages (free)
  - Content:
    - Hero: "MarketPulse AI - News-Driven Market Insights"
    - Value: "Real-time analysis of financial news"
    - Call-to-action: "Beta Signup"
    - Legal: Privacy policy, terms

- [ ] **Create privacy policy page:**
  - Template: COMPLIANCE_FRAMEWORK.md
  - Add to: /privacy route
  - Required: For GDPR/CCPA compliance

- [ ] **Create terms of service page:**
  - Template: COMPLIANCE_FRAMEWORK.md
  - Add to: /terms route
  - Required: Before launch

### H.3 Blog/Content
- [ ] **Plan content for Week 1-4:**
  - "What is MarketPulse AI?" (explain vision)
  - "How news impacts markets" (educational)
  - "Our approach to financial analysis" (transparent)
  - Post: 1x per week on Twitter, LinkedIn

---

## 📋 COMPLETION CHECKLIST

Before Monday 10am Standup, verify:

### SECTION A (Legal/Company)
- [ ] Company formed (LLC/C-Corp)
- [ ] EIN obtained
- [ ] Bank account opened
- [ ] Domain registered
- [ ] Landing page created
- [ ] Securities attorney contacted (in progress)
- [ ] Legal disclaimer drafted

### SECTION B (Technical)
- [ ] GitHub org & repos created
- [ ] AWS account set up
- [ ] Local dev environment working
- [ ] Docker Compose scaffolded
- [ ] Terraform initialized
- [ ] GitHub Actions workflow (stub) created
- [ ] `.env.example` created

### SECTION C (Product)
- [ ] STARTUP_QUESTIONNAIRE.md completed
- [ ] MVP features finalized
- [ ] GitHub Project board with Week 1 tasks
- [ ] 10+ user stories created
- [ ] GitHub issues for each story

### SECTION D (Communication)
- [ ] Slack workspace created + channels set up
- [ ] Email addresses created
- [ ] Shared calendar set up
- [ ] First standup scheduled (Monday 10am PT)
- [ ] All team members invited & confirmed

### SECTION E (Documentation)
- [ ] All docs shared with team
- [ ] Decision log started
- [ ] Agent onboarding packages created
- [ ] Day 1 checklist created

### SECTION F (Financial)
- [ ] Budget finalized
- [ ] Monthly expenses estimated
- [ ] Runway calculated
- [ ] Stripe account created & configured

### SECTION G (Security)
- [ ] 1Password/LastPass team set up
- [ ] Secrets stored securely
- [ ] GitHub branch protection enabled
- [ ] Dependabot enabled

### SECTION H (Nice-to-Have)
- [ ] Landing page live
- [ ] Privacy policy published
- [ ] Blog started (optional)

---

## ⏱️ Time Estimate Summary

| Section | Owner | Time | Days |
|---------|-------|------|------|
| A: Legal/Company | You + Haruto | 2-3h | 1-2 |
| B: Technical Setup | Haruto | 3-4h | 2 |
| C: Product Definition | You | 2-3h | 1 |
| D: Communication | You + Haruto | 3-4h | 1 |
| E: Documentation | Haruto | 2-3h | 1 |
| F: Financial/Budget | You | 1-2h | 1 |
| G: Security | Haruto | 1-2h | 1 |
| H: Nice-to-Have | Haruto | 2h | Optional |
| **TOTAL** | **Both** | **~16-21h** | **~5-6 days** |

**Timeline**: Monday → Friday (get this done!)

---

## 🎯 FINAL REMINDER

### DO THIS FIRST:
1. ✅ Complete **STARTUP_QUESTIONNAIRE.md** with Haruto (2-3 hours)
2. ✅ Schedule & attend **first team standup Monday 10am PT**
3. ✅ Hire **securities attorney** (contact this week!)
4. ✅ Get **legal opinion** on disclaimers (critical!)

### YOU'RE NOT READY TO CODE IF:
- ❌ You don't have legal review (REQUIRED!)
- ❌ You haven't answered the questionnaire
- ❌ Team doesn't understand vision (PROJECT_CHARTER.md)
- ❌ Haruto hasn't confirmed tech stack
- ❌ GitHub repos not set up

### YOU'RE READY TO CODE IF:
- ✅ STARTUP_QUESTIONNAIRE.md completed
- ✅ Attorney review in progress
- ✅ GitHub repos ready
- ✅ Team understands vision & roadmap
- ✅ Haruto confirmed architecture
- ✅ All agents available Monday morning

---

## 📞 Questions?

- **Legal**: Contact securities attorney ASAP
- **Technical**: Ask Haruto
- **Product**: Decide with Haruto
- **Timeline**: See IMPLEMENTATION_ROADMAP.md

---

**You got this! Let's build something great. 🚀**

Version 1.0 | Last Updated 2026-04-17
