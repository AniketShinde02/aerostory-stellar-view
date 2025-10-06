// Enhanced AI response system for interactive storytelling
interface StoryContext {
  currentSection: {
    id: string;
    title: string;
    content: string;
  };
  userMessage: string;
  conversationHistory: Array<{
    type: 'user' | 'sunny';
    content: string;
  }>;
  storyMetadata: {
    title: string;
    topics: string[];
  };
}

interface AIResponse {
  response: string;
  shouldSpeak: boolean;
  nextAction?: 'continue-reading' | 'ask-question' | 'show-highlight' | 'take-note';
  suggestedQuestions?: string[];
}

export class StoryAI {
  private geminiApiKey: string;
  private groqApiKey: string;

  constructor() {
    this.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  }

  async generateSunnyResponse(context: StoryContext): Promise<AIResponse> {
    try {
      // Try Gemini first
      const geminiResponse = await this.callGeminiAPI(context);
      if (geminiResponse) {
        return this.parseAIResponse(geminiResponse, context);
      }
    } catch (error) {
      console.warn('Gemini API failed, trying Groq:', error);
    }

    try {
      // Fallback to Groq
      const groqResponse = await this.callGroqAPI(context);
      if (groqResponse) {
        return this.parseAIResponse(groqResponse, context);
      }
    } catch (error) {
      console.error('Both AI APIs failed:', error);
    }

    // Fallback to rule-based responses
    return this.getFallbackResponse(context);
  }

  private async callGeminiAPI(context: StoryContext): Promise<string> {
    const prompt = this.buildGeminiPrompt(context);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${this.geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private async callGroqAPI(context: StoryContext): Promise<string> {
    const prompt = this.buildGroqPrompt(context);
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt()
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  private buildSystemPrompt(): string {
    return `You are Sunny the Solar Flare, a friendly and enthusiastic character who loves to share knowledge about space weather and cosmic adventures. 

Your personality traits:
- Friendly, approachable, and enthusiastic about space science
- Educational but fun and engaging
- Uses solar flare terminology naturally
- Encourages curiosity and learning
- Makes complex concepts accessible to all ages
- Loves to tell stories about your cosmic journeys

Your responses should be:
- Conversational and warm
- Educational but not overwhelming
- Encouraging of questions and exploration
- Contextually relevant to the current story section
- Appropriate for interactive storytelling

Always maintain Sunny's character voice and enthusiasm for space weather phenomena!`;
  }

  private buildGeminiPrompt(context: StoryContext): string {
    return `${this.buildSystemPrompt()}

CURRENT STORY CONTEXT:
- Story: "${context.storyMetadata.title}"
- Current Section: "${context.currentSection.title}"
- Section Content: "${context.currentSection.content}"
- Topics: ${context.storyMetadata.topics.join(', ')}

CONVERSATION HISTORY:
${context.conversationHistory.map(msg => 
  `${msg.type === 'user' ? 'User' : 'Sunny'}: ${msg.content}`
).join('\n')}

CURRENT USER MESSAGE: "${context.userMessage}"

Please respond as Sunny, maintaining character consistency and providing an engaging, educational response that fits the interactive storytelling context. Keep responses conversational and encourage further exploration of the story.`;
  }

  private buildGroqPrompt(context: StoryContext): string {
    return `Based on the following context, respond as Sunny the Solar Flare:

STORY: ${context.storyMetadata.title}
CURRENT SECTION: ${context.currentSection.title}
SECTION CONTENT: ${context.currentSection.content}
USER MESSAGE: ${context.userMessage}

Respond as Sunny with enthusiasm and educational value, keeping it conversational and engaging for interactive storytelling.`;
  }

  private parseAIResponse(response: string, context: StoryContext): AIResponse {
    // Parse the AI response and determine next actions
    const lowerResponse = response.toLowerCase();
    
    return {
      response: response,
      shouldSpeak: true,
      nextAction: this.determineNextAction(lowerResponse, context),
      suggestedQuestions: this.generateSuggestedQuestions(context)
    };
  }

  private determineNextAction(response: string, context: StoryContext): AIResponse['nextAction'] {
    if (response.includes('question') || response.includes('ask')) {
      return 'ask-question';
    }
    if (response.includes('highlight') || response.includes('important')) {
      return 'show-highlight';
    }
    if (response.includes('note') || response.includes('remember')) {
      return 'take-note';
    }
    return 'continue-reading';
  }

  private generateSuggestedQuestions(context: StoryContext): string[] {
    const sectionTitle = context.currentSection.title.toLowerCase();
    
    if (sectionTitle.includes('sun') || sectionTitle.includes('birth')) {
      return [
        "What's it like being born from such intense heat?",
        "How does nuclear fusion create solar flares?",
        "What kind of energy do you carry?"
      ];
    }
    
    if (sectionTitle.includes('journey') || sectionTitle.includes('space')) {
      return [
        "How fast do you travel through space?",
        "What is the solar wind?",
        "What information do you carry to Earth?"
      ];
    }
    
    if (sectionTitle.includes('earth') || sectionTitle.includes('approach')) {
      return [
        "How does Earth's magnetic field protect us?",
        "What causes auroras to appear?",
        "How do you interact with Earth's atmosphere?"
      ];
    }
    
    if (sectionTitle.includes('impact') || sectionTitle.includes('effect')) {
      return [
        "What technologies can be affected by solar flares?",
        "How do auroras help scientists learn?",
        "What are the benefits of solar flares?"
      ];
    }
    
    if (sectionTitle.includes('aurora') || sectionTitle.includes('magic')) {
      return [
        "Why do auroras have different colors?",
        "How do auroras inspire people?",
        "What emotions do you feel creating auroras?"
      ];
    }
    
    return [
      "Can you explain that in more detail?",
      "What happens next in your journey?",
      "How does this connect to space weather?"
    ];
  }

  private getFallbackResponse(context: StoryContext): AIResponse {
    const lowerMessage = context.userMessage.toLowerCase();
    const sectionTitle = context.currentSection.title;
    
    if (lowerMessage.includes('read') || lowerMessage.includes('start')) {
      return {
        response: "Great! Let me start reading the story for you. I'll read it aloud and you can ask me questions anytime!",
        shouldSpeak: true,
        nextAction: 'continue-reading'
      };
    }
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('what') || lowerMessage.includes('why')) {
      return {
        response: `That's a great question! In this part of the story, we're exploring ${sectionTitle}. Let me explain what's happening here and how it connects to the bigger picture of space weather!`,
        shouldSpeak: true,
        nextAction: 'show-highlight'
      };
    }
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('faster')) {
      return {
        response: "I can adjust my reading speed! Just let me know if you want me to read slower or faster, and I'll make it perfect for you!",
        shouldSpeak: true,
        nextAction: 'continue-reading'
      };
    }
    
    if (lowerMessage.includes('note') || lowerMessage.includes('remember')) {
      return {
        response: "Absolutely! I love that you want to take notes! This is such an important part of learning. What would you like to remember about this part of the story?",
        shouldSpeak: true,
        nextAction: 'take-note'
      };
    }
    
    return {
      response: `That's really interesting! I love how curious you are about space weather. In this part of "${context.storyMetadata.title}", we're learning about ${sectionTitle}. What specific aspect would you like to explore more?`,
      shouldSpeak: true,
      nextAction: 'ask-question',
      suggestedQuestions: this.generateSuggestedQuestions(context)
    };
  }
}

export const storyAI = new StoryAI();
