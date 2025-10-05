# 🔧 API Setup Guide

This guide will help you set up the required APIs for AeroStory to function properly.

## 📋 Required APIs

### 1. 🤖 Gemini AI API (Primary)

#### Setup Steps
1. **Visit Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create a new API key**
4. **Copy the API key** (starts with `AIza...`)

#### Configuration
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Usage
- Primary AI assistant for ChatBot responses
- Handles space weather questions
- Provides educational content
- Smart context-aware responses

#### Rate Limits
- **Free Tier**: 15 requests per minute
- **Paid Tier**: Higher limits available
- **Model**: `gemini-1.5-flash`

---

### 2. 🚀 Groq API (Fallback)

#### Setup Steps
1. **Visit Groq Console**: https://console.groq.com/
2. **Sign up** for a free account
3. **Navigate to API Keys**
4. **Create a new API key**
5. **Copy the API key**

#### Configuration
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

#### Usage
- Fallback AI when Gemini is unavailable
- Fast response times
- Reliable performance
- Model: `llama-3.1-8b-instant`

#### Rate Limits
- **Free Tier**: 14,400 requests per day
- **Fast Response**: ~100ms average
- **High Performance**: Optimized for speed

---

### 3. 🌌 NASA API (Optional)

#### Setup Steps
1. **Visit NASA API Portal**: https://api.nasa.gov/
2. **Sign up** for a free account
3. **Generate API key**
4. **Copy the API key**

#### Configuration
```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

#### Usage
- Real-time space weather data
- Astronomy Picture of the Day (APOD)
- Solar flare and aurora data
- Space weather alerts

#### Rate Limits
- **Free Tier**: 1,000 requests per hour
- **No Authentication**: Required for higher limits
- **Public Data**: Most data available without API key

---

## 🔧 Environment Setup

### 1. Create Environment File
Create a `.env` file in your project root:

```bash
# Copy the example file
cp .env.example .env
```

### 2. Add Your API Keys
```env
# AI APIs (Required)
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# NASA API (Optional)
VITE_NASA_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Restart Development Server
```bash
npm run dev
```

---

## 🧪 Testing Your APIs

### Test Script
Create a test file to verify your API keys:

```javascript
// test-apis.js
const testGemini = async () => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hello, are you working?" }] }]
    })
  });
  return response.ok;
};

const testGroq = async () => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VITE_GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: 'Hello, are you working?' }]
    })
  });
  return response.ok;
};

// Run tests
Promise.all([testGemini(), testGroq()])
  .then(([gemini, groq]) => {
    console.log('Gemini API:', gemini ? '✅ Working' : '❌ Failed');
    console.log('Groq API:', groq ? '✅ Working' : '❌ Failed');
  });
```

### Manual Testing
1. **Open your app** in the browser
2. **Open ChatBot** and ask a question
3. **Check console** for API response logs
4. **Verify** that responses are generated

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Gemini API 404 Error
```
Error: 404 Not Found
```
**Solution**: 
- Verify API key is correct
- Check that you're using `gemini-1.5-flash` model
- Ensure API key has proper permissions

#### 2. Groq API 400 Error
```
Error: 400 Bad Request
```
**Solution**:
- Verify API key format (starts with `gsk_`)
- Check model name: `llama-3.1-8b-instant`
- Ensure request format is correct

#### 3. Rate Limit Exceeded
```
Error: 429 Too Many Requests
```
**Solution**:
- Wait for rate limit reset
- Consider upgrading to paid tier
- Implement request queuing

#### 4. CORS Issues
```
Error: CORS policy blocked
```
**Solution**:
- APIs are configured for browser use
- No CORS configuration needed
- Check network connectivity

### Debug Mode
Enable debug logging by adding to your `.env`:
```env
VITE_DEBUG_APIS=true
```

This will show detailed API request/response logs in the console.

---

## 📊 API Performance

### Response Times
- **Gemini AI**: ~2-3 seconds average
- **Groq AI**: ~100-200ms average
- **NASA API**: ~500ms average

### Reliability
- **Gemini**: 99.9% uptime
- **Groq**: 99.95% uptime
- **NASA**: 99.8% uptime

### Fallback Strategy
1. **Primary**: Try Gemini AI
2. **Fallback**: Try Groq AI
3. **Final**: Use mock response

---

## 🔒 Security Best Practices

### API Key Protection
- **Never commit** API keys to version control
- **Use environment variables** for all keys
- **Rotate keys** regularly
- **Monitor usage** for unusual activity

### Rate Limiting
- **Implement client-side** rate limiting
- **Cache responses** when appropriate
- **Handle errors gracefully**
- **Provide user feedback**

### Error Handling
- **Never expose** API keys in error messages
- **Log errors** securely
- **Provide fallbacks** for all APIs
- **Handle network failures** gracefully

---

## 📈 Monitoring & Analytics

### API Usage Tracking
```typescript
// Example usage tracking
const trackAPIUsage = (api: string, success: boolean, responseTime: number) => {
  console.log(`API: ${api}, Success: ${success}, Time: ${responseTime}ms`);
  // Send to analytics service
};
```

### Performance Monitoring
- **Response times** for each API
- **Success rates** and error rates
- **User satisfaction** with responses
- **Cost tracking** for paid APIs

---

## 🆘 Support & Resources

### Documentation Links
- **Gemini AI**: https://ai.google.dev/docs
- **Groq**: https://console.groq.com/docs
- **NASA API**: https://api.nasa.gov/

### Community Support
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community for help
- **Email**: support@aerostory.space

### Professional Support
- **Enterprise**: Custom API integration
- **Training**: Team training sessions
- **Consulting**: Architecture and optimization

---

## 📝 API Changelog

### Version 2.0.0
- ✅ Added dual API support (Gemini + Groq)
- ✅ Implemented intelligent fallback system
- ✅ Enhanced error handling and recovery
- ✅ Added comprehensive logging
- ✅ Optimized response times

### Version 1.0.0
- ✅ Basic API integration
- ✅ Simple error handling
- ✅ Basic response processing

---

*For more technical details, see [FEATURE_DOCUMENTATION.md](./FEATURE_DOCUMENTATION.md)*

*For setup issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)*

*Last Updated: 2024-12-19*
