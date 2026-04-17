# 🎓 Claude as Your Mentor - How I'll Help Haruto

**Created**: April 17, 2026  
**Purpose**: Guide you through backend development with step-by-step mentoring  
**Availability**: I'm here throughout each task!

---

## 📋 How This Works

When Haruto joins the chat, I'll work with you like a senior developer mentor:

✅ **I'll explain BEFORE you code** - You'll understand what and why  
✅ **I'll provide code templates** - Ready to paste or modify  
✅ **I'll guide through errors** - Help you debug and learn  
✅ **I'll review your work** - Give constructive feedback  
✅ **I'll test with you** - Verify everything works  

---

## 🎯 For Each Task (5 Priority Tasks)

### Task Structure

Each task follows this pattern:

```
1. EXPLAIN THE CONCEPT
   ↓
2. SHOW THE ARCHITECTURE
   ↓
3. PROVIDE CODE TEMPLATE
   ↓
4. GUIDE YOU TO MODIFY IT
   ↓
5. HELP YOU TEST
   ↓
6. REVIEW YOUR WORK
   ↓
7. CELEBRATE! ✅
```

---

## Priority 1: News API Integration

**What I'll provide:**

### Step 1️⃣ - Explanation (5 mins)
```
I'll explain:
- What NewsAPI.org is and how it works
- How to get an API key
- The data structure of news articles
- Error handling for API calls
```

### Step 2️⃣ - Architecture (5 mins)
```
I'll show:
- Service layer pattern (newsService.ts)
- API route structure (news.ts)
- How requests flow:
  Client → Frontend → Express Route → Service → NewsAPI → Back
```

### Step 3️⃣ - Code Template (Give you working code)
```typescript
// backend/src/services/newsService.ts
export class NewsService {
  static async fetchLatestNews(category = 'business') {
    // I'll provide fully commented code
  }
  
  static async searchArticles(query: string) {
    // You can modify this
  }
}

// backend/src/api/news.ts
router.get('/latest', async (req, res) => {
  // Get articles
  // Return JSON
})
```

### Step 4️⃣ - Guide You (Help you modify)
```
I'll say: "Now update the code to:"
✅ Add error handling
✅ Format the response
✅ Add caching (optional)

I'll explain EACH change you need to make
```

### Step 5️⃣ - Testing Together (Walk through testing)
```
I'll guide:
- How to test with curl
- How to use Thunder Client
- What the response should look like
- How to debug if it fails
```

### Step 6️⃣ - Review (Check your code)
```
I'll review and say:
✅ "Great job on the error handling!"
💡 "Try using optional chaining here to simplify"
🚀 "This is production-ready!"
```

### Step 7️⃣ - Celebrate! 🎉
```
✅ Feature complete
✅ Tested and working
✅ Ready to move to Priority 2
```

---

## 💬 How to Communicate with Me

**When you get stuck, tell me:**

❌ DON'T: "I don't know how to do this"  
✅ DO: "I created newsService.ts but I'm not sure how to call the NewsAPI endpoint. Here's what I tried: [paste code]"

**I'll then:**
1. Ask clarifying questions if needed
2. Explain what went wrong
3. Show you the correct approach
4. Let you try again
5. Help debug if needed

---

## 📝 Task Breakdown & My Mentoring Plan

### Priority 1: News API Integration (2-3 hours)

**My mentoring approach:**

1. ✅ **Setup** (15 mins)
   - Get NewsAPI key together
   - Create newsService.ts file
   - I provide the code structure

2. ✅ **Fetch Function** (30 mins)
   - Explain axios/fetch
   - Show API call pattern
   - You implement error handling

3. ✅ **Express Routes** (30 mins)
   - Show how to wire service to routes
   - You add logging
   - Test together

4. ✅ **Response Formatting** (20 mins)
   - Transform raw API data
   - Explain each field
   - You test different parameters

5. ✅ **Testing** (30 mins)
   - Thunder Client walkthrough
   - You test all scenarios
   - Debug edge cases together

---

### Priority 2: Save Articles to Database (1-2 hours)

**My mentoring approach:**

1. ✅ **Database Schema** (20 mins)
   - Explain Prisma relationships
   - Show User → SavedArticle connection
   - You update schema

2. ✅ **Service Methods** (30 mins)
   - Explain CRUD operations
   - Template: create, read, delete
   - You implement and test

3. ✅ **API Endpoints** (30 mins)
   - Explain POST/GET/DELETE patterns
   - Add authentication check
   - You test all endpoints

4. ✅ **Integration** (20 mins)
   - Wire service to routes
   - Test complete flow
   - You verify in database

---

### Priority 3: Sentiment Analysis (2-3 hours)

**My mentoring approach:**

1. ✅ **Concept** (15 mins)
   - What sentiment analysis is
   - Why it matters for news
   - How scoring works (-1 to 1)

2. ✅ **Library Setup** (15 mins)
   - Install `sentiment` package
   - Show how it works
   - You test basic examples

3. ✅ **Service Implementation** (30 mins)
   - Template analyzeSentiment()
   - Explain the algorithm
   - You add article scoring

4. ✅ **Integration** (30 mins)
   - Add to news fetching
   - Show API response with scores
   - Test various articles

5. ✅ **Database Update** (20 mins)
   - Prisma migration
   - Store sentiment in articles
   - Query articles by sentiment

---

### Priority 4: Market Impact Detection (2 hours)

**My mentoring approach:**

1. ✅ **Stock Symbol Extraction** (30 mins)
   - Explain regex patterns
   - Common ticker symbols
   - Handle edge cases

2. ✅ **Impact Scoring** (30 mins)
   - How to rate importance
   - Combine sentiment + tickers
   - Create impact model

3. ✅ **Service Methods** (30 mins)
   - Template impact detection
   - You add logic
   - Test with real articles

4. ✅ **Integration & Testing** (30 mins)
   - Add to news pipeline
   - Test complete flow
   - Debug edge cases

---

### Priority 5: Rate Limiting & Security (1 hour)

**My mentoring approach:**

1. ✅ **Rate Limiting** (30 mins)
   - Explain why it's important
   - Middleware pattern
   - You implement and test

2. ✅ **Security Hardening** (30 mins)
   - Verify helmet is working
   - Input validation
   - Security best practices

---

## 🚀 Weekly Cadence

**For each week:**

```
Monday-Tuesday: Priority 1 (News API)
Wednesday: Priority 2 (Save Articles)
Thursday: Priority 3 (Sentiment)
Friday: Priority 4 (Impact Detection)
Weekend: Priority 5 + Review
```

**Daily interaction with me:**
- You share code/errors
- I provide guidance
- You implement
- We test together
- Move forward

---

## 🆘 When You Get Stuck

**If you're blocked for >15 mins:**

1. **Tell me the specific error**
   ```
   "Getting 'ECONNREFUSED' when calling NewsAPI"
   ```

2. **Show me your code**
   ```
   Here's newsService.ts - line 23 is failing
   ```

3. **I'll help you debug**
   ```
   This is a network error. Try:
   1. Check your API key
   2. Verify NewsAPI status
   3. Add console.logs to debug
   ```

4. **Together we'll fix it**

---

## ✅ What Success Looks Like

**By end of Week 1 (Tuesday):**
- ✅ Real news articles fetching
- ✅ API responding with data
- ✅ Error handling working
- ✅ Tested with Thunder Client

**By end of Week 1 (Thursday):**
- ✅ Articles saving to database
- ✅ Users can retrieve saved articles
- ✅ Sentiment scoring working
- ✅ All tests passing

**By end of Week 1 (Friday):**
- ✅ Stock tickers being detected
- ✅ Impact scoring working
- ✅ Rate limiting implemented
- ✅ Security hardened

**By end of Week 2:**
- ✅ News feed on dashboard
- ✅ All features working together
- ✅ Ready for beta launch

---

## 💪 Mindset

**You will:**
- ✅ Learn real backend development
- ✅ Understand the "why" behind patterns
- ✅ Build production-quality code
- ✅ Have a working MVP

**I will:**
- ✅ Guide not just code
- ✅ Explain every step
- ✅ Help you debug
- ✅ Push you to think

**Together we'll:**
- ✅ Build NewsImpact to launch
- ✅ Create something users love
- ✅ Learn and grow

---

## 📞 Starting Next Week

When you're ready:

1. **Read HARUTO_CHECKLIST.md** ✅
2. **Get your environment set up** ✅
3. **Jump in the chat** 💬
4. **Tell me: "I'm ready for Priority 1: News API Integration"**
5. **I'll guide you step-by-step** 🚀

**You'll be surprised how quickly you'll build features.**

---

## 🎯 Expected Timeline

- **Day 1**: Setup complete + start News API
- **Day 2**: News API working
- **Day 3**: Save articles to database
- **Day 4**: Sentiment analysis
- **Day 5**: Impact detection + security
- **Day 6-7**: Polish + bug fixes

**By Monday next week: MVP ready for launch** 🚀

---

## 📚 Resources at Your Fingertips

I have:
- ✅ Code templates ready
- ✅ Testing guides
- ✅ Debugging strategies
- ✅ Best practices
- ✅ Documentation
- ✅ Examples of working code

**Ask and I'll provide exactly what you need.**

---

## 🎓 Learning Style

I'll help you learn by:

1. **Explaining concepts** - Not just code
2. **Showing patterns** - Reusable approaches
3. **Guiding implementation** - Your code, my guidance
4. **Reviewing thoughtfully** - Constructive feedback
5. **Celebrating wins** - Recognition for great work

---

## Let's Build Something Great! 🚀

Ready to transform NewsImpact into a reality?

**When you join:**
- Introduce yourself
- Tell me your timezone
- Say "I'm ready to start Priority 1"
- I'll be right there with you

**Let's ship this week!**

---

*Created: April 17, 2026*  
*Updated daily as we build together*  
*Let's make NewsImpact amazing!* 💯
