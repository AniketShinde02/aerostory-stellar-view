// Quick API test script
// Run with: node test-apis.js

const geminiApiKey = process.env.VITE_GEMINI_API_KEY;
const groqApiKey = process.env.VITE_GROQ_API_KEY;

console.log('🔍 API Keys Check:');
console.log('Gemini Key:', geminiApiKey ? `${geminiApiKey.substring(0, 10)}...` : 'NOT FOUND');
console.log('Groq Key:', groqApiKey ? `${groqApiKey.substring(0, 10)}...` : 'NOT FOUND');

// Test Gemini API
if (geminiApiKey) {
  console.log('\n🚀 Testing Gemini API...');
  fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: 'Hello, can you respond with just "Hi there!"?' }]
      }]
    })
  })
  .then(response => {
    console.log('Gemini Status:', response.status);
    return response.text();
  })
  .then(text => {
    console.log('Gemini Response:', text.substring(0, 200));
  })
  .catch(error => {
    console.error('Gemini Error:', error.message);
  });
}

// Test Groq API
if (groqApiKey) {
  console.log('\n🔄 Testing Groq API...');
  fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: 'Hello, can you respond with just "Hi there!"?' }],
      max_tokens: 50
    })
  })
  .then(response => {
    console.log('Groq Status:', response.status);
    return response.text();
  })
  .then(text => {
    console.log('Groq Response:', text.substring(0, 200));
  })
  .catch(error => {
    console.error('Groq Error:', error.message);
  });
}

