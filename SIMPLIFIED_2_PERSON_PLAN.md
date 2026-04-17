# 🚀 Simplified Plan - Just You & Haruto

**Team**: You (Product) + Haruto (Technical)  
**Timeline**: 4 weeks to MVP  
**Approach**: Lean, fast, iterate quickly  

---

## ⚠️ Legal Risk Acknowledgment

**You're skipping attorney review initially.** Understand the risks:

- 🚨 **Risk Level**: Medium-High
- 📋 **What you're doing**: Building without legal review of disclaimers/terms
- ⏰ **When to fix**: BEFORE taking money (Stripe setup in Phase 2)
- 💰 **Cost later**: $5-15K attorney review when you need it
- 🛡️ **Mitigation**: Use the COMPLIANCE_FRAMEWORK.md drafts as temporary disclaimers, but treat them as placeholders

**Rule**: Before Premium Tier launch (Week 5), hire attorney for 1-week expedited review. Cost is cheaper than legal liability.

---

## 🎯 Your 4-Day Startup Sprint (April 18-21)

### Thursday Evening (6pm-9pm) - 3 Hours
**Goal**: Answer STARTUP_QUESTIONNAIRE.md + lock vision

#### What to Do:
1. **Open STARTUP_QUESTIONNAIRE.md**
2. **Skip these sections** (too detailed for 2-person team):
   - Section 5.4 (Financial Compliance) - defer to Phase 2
   - Section 5.5 (Regulatory Reporting) - add in Phase 2
   - Section 7.2 (User Feedback) - keep simple for now
   - Section 10 (Team Details) - just list you + Haruto

3. **Focus on these sections** (critical decisions):
   - Section 1: Business & Product (30 min)
   - Section 2: Pricing & Revenue (15 min)
   - Section 3: Technical Architecture (20 min)
   - Section 4: Cloud & DevOps (15 min)
   - Section 11: Success Metrics (15 min)
   - Section 12: Branding & Email (10 min)
   - Section 13: Open Questions (10 min)

4. **Quick decisions** (don't overthink):
   - MVP features: List 5 MUST-HAVE only
   - Tech stack: Use TECHNICAL_ARCHITECTURE.md defaults
   - Timeline: 4 weeks locked in
   - Budget: Assume $10K runway
   - Team: Just you two + code

#### Critical Questions (Answer These):
- [ ] **Target user?** (e.g., "Retail investors aged 25-45")
- [ ] **Problem solving?** (e.g., "They don't understand news impact on markets")
- [ ] **Top 3 news sources?** (e.g., NewsAPI, Guardian, Yahoo Finance)
- [ ] **Premium price?** ($9.99, $19.99, or $29.99/month?)
- [ ] **Year 1 goal?** (users + revenue)
- [ ] **MVP launch date?** (Week 4, confirmed?)

#### Deliverable:
✅ STARTUP_QUESTIONNAIRE_SIMPLIFIED.md (filled out, signed by both)

---

### Friday (Apr 19) - 8 Hours Total (Split Between You)

#### You (Product Lead) - 4 Hours
**Morning 9am-1pm**:
1. **Create GitHub project board** (1 hour)
   - Go to: github.com
   - Create: 1 repo called `marketpulse-ai`
   - Create: GitHub Project board (Kanban)
   - Columns: Backlog, In Progress, Review, Done

2. **Create 10 user stories** (2 hours)
   ```
   Story 1: View Latest News
   - As a user, I want to see latest market news
   - So that I stay informed
   - AC: Load 10-20 articles, < 2s load time
   
   Story 2: Search News
   - As a user, I want to search by ticker/keyword
   - So that I find relevant information
   - AC: Search works, pagination works
   
   Story 3: See Sentiment Analysis
   - As a user, I want to see if news is bullish/bearish
   - So that I understand impact
   - AC: Show sentiment score, color coded
   
   Story 4-10: (your choice based on STARTUP_QUESTIONNAIRE.md)
   ```

3. **Add stories to GitHub** (1 hour)
   - Create GitHub issue for each
   - Label: `feature`
   - Estimate: S/M/L

**Afternoon 2pm-5pm** (While Haruto sets up tech):
1. **Brainstorm marketing angle** (1 hour)
   - How will you describe this to users?
   - What's the 1-sentence pitch?
   - Example: "MarketPulse AI: Understand how news moves markets in real-time"

2. **Plan launch marketing** (1 hour)
   - How do you get first 100 users?
   - Free product hunt launch?
   - Twitter/Reddit posts?
   - Discord communities?
   - Email newsletter?

3. **Create simple landing page outline** (1 hour)
   - Hero section: What is MarketPulse?
   - Features: Top 3 features
   - CTA: "Early Access" signup
   - Footer: Legal links (placeholder)

#### Haruto (Technical Lead) - 4 Hours
**Morning 9am-1pm**:
1. **Create GitHub repo & scaffold** (1.5 hours)
   - Create: `marketpulse-ai` repo (private)
   - Create: Basic folder structure
     ```
     marketpulse-ai/
     ├── backend/
     │   ├── src/
     │   ├── package.json
     │   └── .env.example
     ├── frontend/
     │   ├── src/
     │   ├── package.json
     │   └── .env.example
     ├── ml/
     │   ├── sentiment/
     │   └── requirements.txt
     ├── docker-compose.yml
     ├── README.md
     └── .gitignore
     ```
   - Create: `.gitignore` (node_modules, .env.local, etc.)
   - Create: Basic README.md

2. **Set up AWS account** (1.5 hours)
   - Go to: aws.amazon.com
   - Create: Business account
   - Set up: Basic VPC (use default)
   - Create: S3 bucket for backups
   - Create: RDS instance (PostgreSQL, free tier)
   - Set up: Billing alerts ($100 threshold)

**Afternoon 2pm-5pm**:
1. **Create docker-compose.yml** (1.5 hours)
   ```yaml
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: marketpulse
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

     redis:
       image: redis:7
       ports:
         - "6379:6379"

   volumes:
     postgres_data:
   ```
   - Local development database working
   - Local Redis cache working

2. **Initialize backend scaffold** (1 hour)
   ```
   backend/
   ├── src/
   │   ├── index.ts (entry point)
   │   ├── api/
   │   │   └── routes.ts
   │   ├── services/
   │   │   ├── news.service.ts
   │   │   └── sentiment.service.ts
   │   └── models/
   │       └── Article.ts
   ├── package.json
   ├── tsconfig.json
   └── Dockerfile
   ```

3. **Initialize frontend scaffold** (1 hour)
   ```
   frontend/
   ├── src/
   │   ├── App.tsx
   │   ├── pages/
   │   │   └── Home.tsx
   │   ├── components/
   │   │   ├── NewsFeed.tsx
   │   │   └── SearchBar.tsx
   │   └── styles/
   │       └── App.css
   ├── package.json
   ├── tsconfig.json
   └── vite.config.ts
   ```

#### Deliverables (Friday):
✅ GitHub repo created + scaffold  
✅ AWS account set up  
✅ docker-compose.yml working  
✅ Backend/frontend/ML folders created  
✅ 10 user stories in GitHub  

---

### Saturday (Apr 20) - 8 Hours (Independent)

#### You (Product) - 4 Hours

1. **Financial projections** (2 hours)
   - Create simple spreadsheet:
     ```
     Month 1: 0 users, $0 revenue, -$1000 expense
     Month 2: 100 users, $50 revenue (5% premium), -$950 loss
     Month 3: 500 users, $250 revenue, -$750 loss
     ...
     Month 8: 10K users, $7500 revenue, +$6000 profit!
     ```
   - Show: When you break even
   - Calculate: Total runway needed

2. **Product roadmap (high level)** (2 hours)
   - Week 1-4 (MVP): What's launching?
   - Week 5-8 (Growth): Premium tier, advanced features
   - Week 9-12 (Scaling): Enterprise, API
   - Post-12w (Expansion): Mobile app, new data sources

#### Haruto (Technical) - 4 Hours

1. **Database schema design** (2 hours)
   ```sql
   -- Users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE,
     created_at TIMESTAMP
   );

   -- Articles table
   CREATE TABLE articles (
     id SERIAL PRIMARY KEY,
     headline VARCHAR(255),
     source VARCHAR(100),
     published_at TIMESTAMP,
     sentiment FLOAT,
     created_at TIMESTAMP
   );

   -- Sentiment scores table
   CREATE TABLE sentiment_scores (
     id SERIAL PRIMARY KEY,
     article_id INT REFERENCES articles(id),
     score FLOAT,
     label VARCHAR(20), -- positive, negative, neutral
     confidence FLOAT,
     created_at TIMESTAMP
   );
   ```

2. **API endpoint design** (2 hours)
   - Sketch out endpoints:
     ```
     GET /api/v1/news/recent?limit=10
     Response: { articles: [...] }

     GET /api/v1/news/search?q=apple
     Response: { results: [...] }

     GET /api/v1/sentiment/article/:id
     Response: { sentiment: 0.85, label: "positive" }
     ```

#### Deliverables (Saturday):
✅ Financial model  
✅ Roadmap (visual)  
✅ Database schema (SQL file)  
✅ API design doc  

---

### Sunday (Apr 21) - 4 Hours

**Morning (9am-12pm)** - Both Together (3 hours):

1. **Review everything** (1 hour)
   - GitHub repo looks good?
   - Database schema makes sense?
   - API design clear?
   - Roadmap realistic?
   - Questionnaire complete?

2. **Create Week 1 task list** (1 hour)
   ```
   WEEK 1 TASKS:
   
   Haruto:
   - Set up GitHub Actions (test on PR, deploy on merge)
   - Create Express.js hello-world backend
   - Create React hello-world frontend
   - Get local docker-compose running
   - Integrate NewsAPI.org (fetch first 100 articles)
   
   You:
   - Create simple landing page (HTML/CSS)
   - Set up Stripe account (test mode)
   - Create basic Slack workspace
   - Finalize product messaging
   - Plan first user outreach
   ```

3. **Prepare standup notes** (1 hour)
   - Vision: 1 sentence
   - MVP: 5 features list
   - Timeline: 4 weeks
   - Goals Week 1: What will ship?
   - Success metric: "By Friday, MVP features 50% complete"

**Afternoon (1pm-3pm)** - Independent (1 hour):

1. **Haruto**: Review GitHub Actions docs (30 mins), plan CI/CD setup
2. **You**: Draft first user pitch (30 mins), plan email list signup

---

## 📋 What You'll Have by Monday 10am

✅ Completed questionnaire  
✅ GitHub repo created + scaffolded  
✅ AWS account set up  
✅ docker-compose.yml working  
✅ Database schema designed  
✅ API design finalized  
✅ 10 user stories in backlog  
✅ Financial projections  
✅ Week 1 task list  
✅ Simple landing page outlined  
✅ Marketing strategy sketched  

**= READY TO LAUNCH WEEK 1**

---

## 🎯 What Monday Standup Looks Like (Just You Two)

**Time**: 30 minutes (not 1 hour, since it's just 2 people)

```
10:00-10:05: Vision recap
"We're building MarketPulse AI to help retail investors understand 
how global news impacts financial markets in real-time."

10:05-10:10: MVP scope
"Week 4 we ship: news feed + sentiment analysis + search"

10:10-10:15: Week 1 plan
"Haruto: backend scaffold + NewsAPI integration
You: landing page + user outreach strategy"

10:15-10:20: Success metrics
"By Friday: backend returns 100 articles with sentiment scores"

10:20-10:30: Questions & planning
```

Then you START CODING.

---

## ⚡ Week 1 Development (April 22-26)

### Haruto's Week 1:
```
Monday: Set up GitHub Actions, Express.js skeleton
Tuesday: Integrate NewsAPI, get data flowing into PostgreSQL
Wednesday: Basic sentiment model testing
Thursday: Connect backend to frontend
Friday: Everything running locally, demo to you
```

### You Week 1:
```
Monday: Set up Stripe test mode, landing page HTML/CSS
Tuesday: Early user outreach plan, Twitter/Reddit posts
Wednesday: Landing page live on GitHub Pages
Thursday: Set up basic email list (Mailchimp free tier)
Friday: Review Haruto's demo, plan Week 2 features
```

### By Friday EOD (April 26):
- ✅ Backend returns news articles from NewsAPI
- ✅ Sentiment scores attached to articles
- ✅ Frontend displays news feed
- ✅ Local docker-compose fully working
- ✅ Landing page live (even if basic)
- ✅ First 10 beta signups

---

## 💼 When to Add Legal Later

**Before Premium Tier Launch (Week 5)**:
1. Hire attorney (1-week expedited review): $3-5K
2. Attorney reviews:
   - Disclaimer language
   - Terms of Service
   - Privacy Policy
3. You publish final versions

**This saves you**: Not hiring attorney now ($5-15K) and using COMPLIANCE_FRAMEWORK.md drafts as placeholder

**This costs you**: Risk of lawsuit if you mess up disclaimers (unlikely but possible)

**Our take**: Acceptable risk for MVP launch. Fix before taking money in Week 5.

---

## 📊 Simplified Questionnaire (For 2-Person Team)

Skip these sections from STARTUP_QUESTIONNAIRE.md:
- Section 5 (much of it) - defer to Phase 2
- Section 7 (simplify) - early users only
- Section 8 (defer) - hiring later
- Section 9 (just list you two) - only 2 people
- Section 10 (simplified) - lower budget

**Focus sections** (15-20 mins total):
- Section 1: Business idea
- Section 2: Pricing model
- Section 3: Tech decisions
- Section 4: AWS choices
- Section 11: Success metrics

---

## 🎯 Absolute Essentials (Don't Skip)

1. ✅ **Questionnaire** - Decide together Thursday evening
2. ✅ **GitHub repo** - Haruto sets up Friday morning
3. ✅ **Database design** - Finalized Saturday
4. ✅ **AWS account** - Live Friday (free tier)
5. ✅ **docker-compose.yml** - Local dev environment working

**If these 5 are done by Monday, you're good to go.**

---

## 💰 Budget (Lean Version)

| Item | Cost | Timeline |
|------|------|----------|
| AWS (free tier) | $0 first year | Ongoing |
| NewsAPI.org | $150/month | Start Week 1 |
| Domain name | $12/year | Later (Week 2) |
| GitHub Pro (optional) | $13/month | Later |
| Slack (optional) | Free tier | Now |
| Legal review (later) | $3-5K | Week 4-5 |
| **Total (MVP)** | **~$200/month** | **Months 1-4** |
| **Total (Including legal)** | **$3-5K one-time** | **Week 5** |

**Runway**: With $10K budget = ~50 months (plenty of time)

---

## 🚀 You're Ready

Everything you need is in:
- STARTUP_QUESTIONNAIRE.md (simplified)
- TECHNICAL_ARCHITECTURE.md (reference only)
- IMPLEMENTATION_ROADMAP.md (your 12-week plan)
- GETTING_STARTED.md (dev setup)

**New documents for you**:
- This file (simplified 2-person plan)
- WEEK_1_ACTION_PLAN.md (use "Your Role" and "Haruto's Role" sections)

**Skip these documents**:
- AI_TEAM_STRUCTURE.md (no team, just 2)
- PRE_LAUNCH_CHECKLIST.md (too detailed for 2 people)
- Sections about "hiring team" or "legal review"

---

## 🎉 Next Step

1. ✅ Read this file (you just did!)
2. ✅ Thursday 6pm: Start STARTUP_QUESTIONNAIRE.md with Haruto
3. ✅ Friday: Follow "Friday" section above
4. ✅ Saturday: Follow "Saturday" section above
5. ✅ Sunday: Follow "Sunday" section above
6. ✅ Monday: Start coding!

**Total time**: ~20 hours split between you = 4 days of work

**Then**: 4 weeks of development (MVP launch Week 4)

---

## ⚠️ Legal Note (One More Time)

You're building WITHOUT attorney review for MVP. This means:

**Risks**:
- SEC could say "you're giving investment advice" (you're not, but disclaimer needs to prove it)
- User loses money, sues you (disclaimers protect you IF written correctly)
- Need airtight language that says: "Not financial advice. Educational only."

**Mitigation**:
- Use COMPLIANCE_FRAMEWORK.md disclaimers (decent template)
- Put disclaimers on EVERY page
- Never say "buy" or "sell" or give specific recommendations
- Say "might impact" not "will impact"
- Say "historically" not "definitely"

**Before Premium Launch (Week 5)**:
- Hire securities attorney ($3-5K, 1-week review)
- Attorney fixes any language issues
- You go live with confidence

**This is acceptable for MVP but NOT for paid tier.**

---

**You've got this! Let's ship in 4 weeks. 🚀**

Version 1.0 | Simplified 2-Person Plan | April 17, 2026
