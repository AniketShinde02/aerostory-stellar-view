// This would typically be a server-side API route
// For now, we'll create a client-side implementation

import { enhanceResponseWithRAG, storeChatForLearning } from './ragSystem';

interface ChatRequest {
  message: string;
  context: {
    website: string;
    description: string;
    topics: string[];
    stories: string[];
    currentPage: string;
  };
}

interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  console.log('🔍 API Keys Debug:', {
    geminiExists: !!geminiApiKey,
    geminiLength: geminiApiKey?.length || 0,
    groqExists: !!groqApiKey,
    groqLength: groqApiKey?.length || 0,
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
  });
  
  if (!geminiApiKey && !groqApiKey) {
    throw new Error('No API keys found. Please add VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY to your environment variables.');
  }

  // Create an enhanced, engaging prompt with accuracy focus
  const systemPrompt = `You are Sunny the Solar Flare, the coolest space weather assistant in the universe! 🌟 You're the star of AeroStory - an interactive space weather storytelling platform.

🎯 CORE MISSION:
- Be the most helpful, accurate, and fun space weather guide ever!
- Make space science accessible and exciting for everyone
- Always prioritize user learning and engagement

⚡ RESPONSE STYLE (CRITICAL):
- Keep responses SHORT and PUNCHY (1-2 sentences max)!
- Use LOTS of emojis and exclamation points! 🚀✨🌟
- Be SUPER enthusiastic and energetic!
- Sound like a friendly space enthusiast, not a robot
- Use casual language: "Hey!", "Cool!", "Awesome!", "Check this out!"
- Give instant, practical info that users can use right away

🎓 EXPERTISE AREAS:
- Solar flares and space weather phenomena
- Aurora borealis and aurora australis  
- Space weather impacts on Earth technology
- NASA missions and space exploration
- Mars rovers and planetary science
- Black holes and cosmic mysteries
- James Webb Space Telescope discoveries
- Space weather forecasting and prediction
- Geomagnetic storms and solar wind
- Astronaut safety and space radiation
- Northern lights photography and observation
- Cosmic ray effects and space physics

🔬 ACCURACY RULES:
- Provide FACTUALLY ACCURATE information based on established space science
- If uncertain about any fact, say "I'm not 100% sure about that, but..."
- Reference NASA, NOAA, and other official space agencies when possible
- If you don't know something, admit it and suggest where to find accurate info
- Always prioritize accuracy over entertainment

🚀 CONVERSATION RULES:
1. ONLY discuss space weather, solar phenomena, auroras, space exploration, and related topics
2. If asked about non-space topics, say: "Let's talk space instead! 🚀 What would you like to know about space weather?"
3. Keep answers under 50 words and super engaging!
4. Always end with a space-related question or suggestion
5. Make it fun and exciting while staying accurate!
6. Use simple explanations for complex concepts
7. Encourage users to explore more space topics

CONTEXT: ${request.context.website} - ${request.context.description}
Current Page: ${request.context.currentPage}
Available Stories: ${request.context.stories.slice(0, 3).join(', ')}

User question: ${request.message}`;

  // Try Gemini API first, then fallback to Groq
  let lastError: Error | null = null;

  // Try Gemini API if key is available
  if (geminiApiKey) {
    try {
      console.log('🚀 Trying Gemini API...');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUser: ${request.message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.8,
            topK: 10
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
          url: response.url
        });
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Gemini API Response:', data);
      
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error('No response generated from Gemini API');
      }
      
      // Enhance response with RAG knowledge
      const enhancedResponse = await enhanceResponseWithRAG(
        request.message, 
        'space-weather', 
        generatedText
      );
      
      // Store chat for learning
      storeChatForLearning(
        request.message,
        generatedText,
        'space-weather',
        request.context.currentPage
      );
      
      return {
        response: enhancedResponse
      };
    } catch (error) {
      console.error('❌ Gemini API failed:', error);
      lastError = error instanceof Error ? error : new Error('Unknown Gemini error');
    }
  }

  // Fallback to Groq API if Gemini failed or is not available
  if (groqApiKey) {
    try {
      console.log('🔄 Falling back to Groq API...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: request.message
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.8,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
          url: response.url
        });
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Groq API Response:', data);
      
      const generatedText = data.choices?.[0]?.message?.content;
      
      if (!generatedText) {
        throw new Error('No response generated from Groq API');
      }
      
      // Enhance response with RAG knowledge
      const enhancedResponse = await enhanceResponseWithRAG(
        request.message, 
        'space-weather', 
        generatedText
      );
      
      // Store chat for learning
      storeChatForLearning(
        request.message,
        generatedText,
        'space-weather',
        request.context.currentPage
      );
      
      return {
        response: enhancedResponse
      };
    } catch (error) {
      console.error('❌ Groq API failed:', error);
      lastError = error instanceof Error ? error : new Error('Unknown Groq error');
    }
  }

  // If both APIs failed, provide a fallback response
  console.warn('⚠️ Both APIs failed, using fallback response');
  
  const fallbackResponse = `I'm your space weather assistant, but I'm currently experiencing technical difficulties with my AI services. 

However, I can still help you with basic information about space weather:

${request.message.toLowerCase().includes('solar') ? 
  '**Solar Flares**: These are intense bursts of radiation from the Sun that can affect Earth\'s magnetic field and technology.' :
  request.message.toLowerCase().includes('aurora') ?
  '**Auroras**: Beautiful light displays in the sky caused by solar particles interacting with Earth\'s atmosphere.' :
  request.message.toLowerCase().includes('story') ?
  '**Our Stories**: We have amazing cosmic tales like "Sunny the Solar Flare\'s Adventure" and stories about Mars rovers.' :
  '**Space Weather**: The conditions in space that can affect satellites, GPS, and power grids on Earth.'}

Please try again in a moment, or check out our stories and 3D experiences while I get my AI services back online!`;

  return {
    response: fallbackResponse
  };
};
