# 🤖 ChatBot Setup Guide

## Issue Identified
The chatbot is not working because the **Gemini API key is missing**. The chatbot code is properly implemented and will work once the API key is configured.

## 🚀 Quick Fix

### Step 1: Create Environment File
Create a `.env` file in your project root with the following content:

```bash
# AeroStory - Stellar Stories Environment Variables

# NASA API Key for space data and images
# Get your free API key at: https://api.nasa.gov/
VITE_NASA_API_KEY=your_nasa_api_key_here

# Google Gemini API Key for chatbot functionality
# Get your API key at: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Enable debug logging
VITE_DEBUG_MODE=false
```

### Step 2: Get Your API Keys

#### NASA API Key (Free)
1. Visit: https://api.nasa.gov/
2. Fill out the simple form
3. You'll get an API key immediately
4. Replace `your_nasa_api_key_here` with your actual key

#### Gemini API Key (Free tier available)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key
4. Replace `your_gemini_api_key_here` with your actual key

### Step 3: Restart Development Server
```bash
npm run dev
```

## 🔧 How the Chatbot Works

The chatbot implementation includes:

- **Smart Context Awareness**: Adapts suggestions based on current page
- **Rich Content Support**: Can show story previews and NASA images
- **Voice Input**: Speech recognition for hands-free interaction
- **Error Handling**: Clear error messages for API issues
- **Connection Status**: Visual indicators for API connectivity
- **Quick Actions**: Navigate to stories, AeroVerse, or ask about topics

## 🐛 Debugging

If you're still having issues:

1. **Check Browser Console**: Look for API key validation messages
2. **Verify API Key Format**: Gemini keys start with "AI"
3. **Test API Key**: Try the Gemini API directly to ensure it works
4. **Check Network Tab**: Look for failed API requests

## 📝 Expected Behavior

Once configured, the chatbot should:
- Show "Connected" status (green dot)
- Respond to questions about space weather, solar flares, auroras
- Provide contextual suggestions based on the current page
- Allow voice input (if browser supports it)
- Display rich content like story previews

## 🚨 Current Error Message

Without the API key, users will see:
> ⚠️ API configuration error: Gemini API key not found. Please check your environment variables.

This is the expected behavior and confirms the chatbot code is working correctly!


