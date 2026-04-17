# MarketPulse AI - Technical Architecture

## 🏛️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL DATA SOURCES                      │
│  NewsAPI | Guardian API | SEC EDGAR | Company Press Releases   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  News Ingestion     │
                    │  Pipeline           │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌─────────┐         ┌──────────────┐      ┌─────────────┐
   │ Raw News│         │ Normalization│      │ Deduplication
   │ Storage │         │   Service    │      │   & Ranking │
   └─────────┘         └──────────────┘      └─────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  News Database      │
                    │  (PostgreSQL)       │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌──────────┐         ┌────────────┐      ┌──────────────┐
   │Sentiment │         │Market Impact│     │ Historical   │
   │Analysis  │         │  Engine     │     │ Analogs      │
   │(NLP)     │         │(ML/Rules)   │     │(VectorDB)    │
   └──────────┘         └────────────┘      └──────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Cache Layer        │
                    │  (Redis)            │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌──────────┐         ┌────────────┐      ┌──────────────┐
   │ REST API │         │ GraphQL API│      │ WebSocket API│
   │ (Node.js)│         │ (Apollo)   │      │(Real-time)   │
   └──────────┘         └────────────┘      └──────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌──────────┐         ┌────────────┐      ┌──────────────┐
   │ Frontend │         │Auth Service│      │Analytics &   │
   │(React)   │         │(JWT/OAuth) │      │Monitoring    │
   └──────────┘         └────────────┘      └──────────────┘
```

---

## 🗄️ Data Architecture

### Core Databases

1. **PostgreSQL (Primary)**
   - News articles & metadata
   - User accounts & subscriptions
   - Watchlists & alerts
   - Historical sentiment scores
   - API usage logs

2. **Redis (Cache)**
   - Real-time news feed
   - Hot asset data
   - User sessions
   - Rate limiting counters

3. **Vector Database (Pinecone/Weaviate)**
   - News embeddings for similarity
   - Historical analog matching
   - Semantic search capability

4. **Time-Series Database (InfluxDB/TimescaleDB)**
   - Market sentiment trends over time
   - Asset price correlation data
   - Confidence score evolution

---

## 🔄 Data Flow Pipeline

### Phase 1: News Ingestion (Real-time)
```
News API Hook
    ↓
Parse & Extract
    ├── Headline
    ├── Content (summary)
    ├── Source
    ├── Timestamp
    ├── URL
    └── Author
    ↓
Normalization
    ├── Clean text
    ├── Standardize format
    ├── Extract metadata
    └── Check duplicates
    ↓
Enrichment
    ├── Add category tags
    ├── Add geographic info
    ├── Extract ticker symbols
    └── Flag for AI processing
    ↓
Store in PostgreSQL
```

### Phase 2: AI Analysis (Parallel)
```
News Entry → Sentiment Analyzer
                 ├── Positive
                 ├── Negative
                 ├── Neutral
                 └── Uncertain + Confidence Score

News Entry → Market Impact Engine
                 ├── Affected Assets
                 ├── Sector Impact
                 ├── Confidence Level
                 └── Time Horizon

News Entry → Historical Analog Matcher
                 ├── Similar past events
                 ├── Outcome correlations
                 └── Pattern confidence

All Results → Cache & DB
```

### Phase 3: API Response
```
User Query
    ↓
Check Cache (Redis)
    ├── Hit? → Return (fast)
    └── Miss? → Continue
    ↓
Query Database
    ├── Retrieve relevant news
    ├── Get sentiment scores
    ├── Fetch impact predictions
    └── Historical analogs
    ↓
Format Response
    ├── Build JSON/GraphQL
    ├── Add pagination
    ├── Cache result
    └── Log analytics
    ↓
Return to Frontend
```

---

## 🛠️ Technology Stack

### Backend
- **Language**: Node.js (JavaScript/TypeScript)
- **Framework**: Express.js + NestJS
- **Database**: PostgreSQL 15+
- **Cache**: Redis
- **Vector DB**: Pinecone or Weaviate
- **Message Queue**: RabbitMQ or AWS SQS
- **Search**: Elasticsearch

### AI/ML
- **NLP Framework**: Hugging Face Transformers
- **Sentiment**: Pre-trained models (DistilBERT, BERT)
- **Embeddings**: OpenAI embeddings or Sentence-Transformers
- **Orchestration**: Apache Airflow or Prefect
- **ML Ops**: MLflow

### Frontend
- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **Charts**: Recharts or D3.js
- **Real-time**: Socket.io
- **Build**: Vite
- **CSS**: Tailwind CSS

### DevOps
- **Container**: Docker
- **Orchestration**: Kubernetes (k8s) or Docker Swarm
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (or GCP/Azure)
  - Compute: EC2 / ECS
  - Databases: RDS PostgreSQL
  - Cache: ElastiCache Redis
  - Storage: S3
  - CDN: CloudFront
  - Monitoring: CloudWatch
- **Infrastructure**: Terraform

### Monitoring & Logging
- **Monitoring**: Datadog or New Relic
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tracing**: Jaeger or Datadog APM
- **Uptime**: Pingdom or UptimeRobot

---

## 🔑 Key Service Definitions

### 1. News Ingestion Service
**Purpose**: Fetch, parse, and normalize news from multiple sources

**API Integrations**:
- NewsAPI.org (100+ sources, 15K articles/day)
- Guardian API (real-time news)
- SEC EDGAR (financial filings)
- Company press releases (RSS feeds)
- Reuters, Bloomberg (premium - optional)

**Endpoints**:
```
POST /api/news/ingest         # Trigger ingestion
GET /api/news/sources         # List active sources
POST /api/news/sources        # Add new source
GET /api/news/recent          # Get latest 100 articles
```

### 2. Sentiment Analysis Service
**Purpose**: Analyze news sentiment and impact

**Models**:
- DistilBERT for sentiment classification
- GPT-based summarization
- Custom fine-tuned models for financial sentiment

**Endpoints**:
```
POST /api/analysis/sentiment  # Analyze text
GET /api/analysis/article/:id # Get sentiment for article
POST /api/analysis/batch      # Batch analysis
```

### 3. Market Impact Engine
**Purpose**: Predict which assets are affected and how

**Logic**:
- Named Entity Recognition (NER) for ticker extraction
- Sector mapping (GICS codes)
- Historical correlation database
- Confidence scoring algorithm

**Endpoints**:
```
GET /api/impact/assets/:ticker    # Assets affected by ticker
GET /api/impact/news/:newsId      # Impact from specific news
POST /api/impact/analyze          # Custom impact analysis
```

### 4. User Management Service
**Purpose**: Authentication, subscriptions, watchlists

**Features**:
- JWT authentication
- OAuth 2.0 (Google, GitHub)
- Stripe subscription management
- User preferences & settings
- Watchlist CRUD operations

**Endpoints**:
```
POST /api/auth/register           # Register user
POST /api/auth/login              # Login
GET /api/user/profile             # Get user data
POST /api/user/watchlist          # Add to watchlist
GET /api/user/watchlist           # Get watchlist
DELETE /api/user/watchlist/:id    # Remove from watchlist
```

### 5. WebSocket Service
**Purpose**: Real-time updates for premium users

**Events**:
```
breaking-news      # New high-impact news
watchlist-update   # Updates on watched assets
market-alert       # Major market movements
sentiment-shift    # Significant sentiment changes
```

---

## 📊 API Specifications

### REST API Example: Get Market Impact for Asset

```
GET /api/v1/impact/stocks/AAPL?timeframe=intraday&limit=10

Response:
{
  "asset": {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "type": "stock"
  },
  "timeframe": "intraday",
  "impacts": [
    {
      "newsId": "news_12345",
      "headline": "Apple announces new AI chip partnership",
      "source": "TechCrunch",
      "timestamp": "2026-04-17T14:32:00Z",
      "sentiment": "positive",
      "confidence": 0.92,
      "affectedAssets": [
        {
          "ticker": "AAPL",
          "sentiment": "bullish",
          "magnitude": "moderate",
          "timeHorizon": "short-term",
          "confidence": 0.88
        }
      ],
      "historicalContext": [
        {
          "event": "Previous AI partnerships (2024)",
          "outcome": "Stock +3.2% in 2 weeks",
          "relevance": 0.78
        }
      ]
    }
  ],
  "summary": {
    "totalImpacts": 3,
    "bullishCount": 2,
    "bearishCount": 1,
    "averageConfidence": 0.85
  }
}
```

### GraphQL API Example

```graphql
query GetAssetInsights {
  asset(ticker: "AAPL") {
    name
    currentSentiment {
      score
      trend
      changedAt
    }
    recentNews(limit: 5) {
      headline
      source
      timestamp
      sentiment {
        label
        confidence
      }
      marketImpact {
        affectedAssets {
          ticker
          sentiment
          magnitude
        }
        confidence
      }
    }
  }
}
```

---

## 🔐 Security Architecture

### Authentication
- JWT tokens (15 min expiry)
- Refresh tokens (7 day expiry)
- Rate limiting: 1000 req/min per user
- IP whitelisting for enterprise

### Data Protection
- TLS 1.3 for all communications
- AES-256 encryption for sensitive data
- GDPR: Data anonymization after 90 days
- CCPA: User data deletion on request

### API Security
- CORS restrictions
- API key management
- DDoS protection (Cloudflare)
- Web Application Firewall (WAF)

---

## 📈 Scalability Plan

### Phase 1 (MVP)
- Single Node.js server
- PostgreSQL (t3.medium RDS)
- Redis (cache-t3.small)
- ~10K concurrent users

### Phase 2 (Growth)
- Horizontal scaling with load balancer
- Database read replicas
- CDN for static assets
- ~100K concurrent users

### Phase 3 (Enterprise)
- Full Kubernetes cluster
- Multi-region deployment
- Global CDN
- ~1M+ concurrent users

---

## 🧪 Testing Strategy

- **Unit Tests**: Jest (90%+ coverage)
- **Integration Tests**: Supertest (API endpoints)
- **E2E Tests**: Cypress (user workflows)
- **Performance Tests**: k6 (load testing)
- **Security Tests**: OWASP ZAP, Snyk

---

## 📋 Deployment Checklist

- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented
- [ ] Stakeholders notified
