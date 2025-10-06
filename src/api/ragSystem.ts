// RAG (Retrieval Augmented Generation) System for AeroStory
// This system allows the bot to learn and improve from conversations over time

interface ChatMemory {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  userRating?: 'good' | 'bad' | 'neutral';
  topic: string;
  context: string;
}

interface KnowledgeBase {
  id: string;
  content: string;
  source: string;
  topic: string;
  confidence: number;
  lastUpdated: Date;
  usageCount: number;
}

class RAGSystem {
  private chatMemories: ChatMemory[] = [];
  private knowledgeBase: KnowledgeBase[] = [];
  private readonly STORAGE_KEY = 'aerostory_rag_system';

  constructor() {
    this.loadFromStorage();
  }

  // Store chat conversation for learning
  storeChatMemory(question: string, answer: string, topic: string, context: string) {
    const memory: ChatMemory = {
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      question,
      answer,
      timestamp: new Date(),
      topic,
      context
    };

    this.chatMemories.push(memory);
    this.saveToStorage();
    
    // Auto-analyze and extract knowledge
    this.analyzeAndExtractKnowledge(memory);
  }

  // Rate a response for learning
  rateResponse(questionId: string, rating: 'good' | 'bad' | 'neutral') {
    const memory = this.chatMemories.find(m => m.id === questionId);
    if (memory) {
      memory.userRating = rating;
      this.saveToStorage();
      
      // Update knowledge base based on rating
      this.updateKnowledgeFromRating(memory, rating);
    }
  }

  // Retrieve relevant knowledge for a question
  retrieveRelevantKnowledge(question: string, topic: string): KnowledgeBase[] {
    const relevantKnowledge = this.knowledgeBase.filter(kb => 
      kb.topic.toLowerCase().includes(topic.toLowerCase()) ||
      kb.content.toLowerCase().includes(question.toLowerCase()) ||
      this.calculateSimilarity(question, kb.content) > 0.3
    );

    // Sort by confidence and usage count
    return relevantKnowledge
      .sort((a, b) => (b.confidence + b.usageCount) - (a.confidence + a.usageCount))
      .slice(0, 5); // Return top 5 most relevant
  }

  // Analyze chat memory and extract knowledge
  private analyzeAndExtractKnowledge(memory: ChatMemory) {
    // Extract key facts from the answer
    const facts = this.extractFacts(memory.answer);
    
    facts.forEach(fact => {
      const existingKnowledge = this.knowledgeBase.find(kb => 
        kb.content.toLowerCase().includes(fact.toLowerCase())
      );

      if (existingKnowledge) {
        // Update existing knowledge
        existingKnowledge.usageCount++;
        existingKnowledge.lastUpdated = new Date();
        existingKnowledge.confidence = Math.min(existingKnowledge.confidence + 0.1, 1.0);
      } else {
        // Add new knowledge
        const newKnowledge: KnowledgeBase = {
          id: `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          content: fact,
          source: 'user_conversation',
          topic: memory.topic,
          confidence: 0.7,
          lastUpdated: new Date(),
          usageCount: 1
        };
        this.knowledgeBase.push(newKnowledge);
      }
    });

    this.saveToStorage();
  }

  // Extract facts from text using simple NLP
  private extractFacts(text: string): string[] {
    const facts: string[] = [];
    
    // Look for factual statements (simple heuristic)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      
      // Check if it's a factual statement
      if (this.isFactualStatement(trimmed)) {
        facts.push(trimmed);
      }
    });

    return facts;
  }

  // Simple heuristic to determine if a statement is factual
  private isFactualStatement(text: string): boolean {
    const factualIndicators = [
      'is', 'are', 'was', 'were', 'has', 'have', 'had',
      'can', 'will', 'may', 'might', 'causes', 'creates',
      'forms', 'occurs', 'happens', 'travels', 'takes'
    ];

    const lowerText = text.toLowerCase();
    return factualIndicators.some(indicator => lowerText.includes(indicator)) &&
           text.length > 15 &&
           !text.includes('?') &&
           !text.includes('!');
  }

  // Calculate similarity between two strings
  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return intersection.length / union.length;
  }

  // Update knowledge based on user rating
  private updateKnowledgeFromRating(memory: ChatMemory, rating: 'good' | 'bad' | 'neutral') {
    const relatedKnowledge = this.knowledgeBase.filter(kb => 
      kb.topic === memory.topic
    );

    relatedKnowledge.forEach(kb => {
      if (rating === 'good') {
        kb.confidence = Math.min(kb.confidence + 0.2, 1.0);
        kb.usageCount++;
      } else if (rating === 'bad') {
        kb.confidence = Math.max(kb.confidence - 0.3, 0.1);
      }
    });

    this.saveToStorage();
  }

  // Load data from localStorage
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.chatMemories = data.chatMemories?.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })) || [];
        this.knowledgeBase = data.knowledgeBase?.map((kb: any) => ({
          ...kb,
          lastUpdated: new Date(kb.lastUpdated)
        })) || [];
      }
    } catch (error) {
      console.error('Error loading RAG data:', error);
    }
  }

  // Save data to localStorage
  private saveToStorage() {
    try {
      const data = {
        chatMemories: this.chatMemories,
        knowledgeBase: this.knowledgeBase,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving RAG data:', error);
    }
  }

  // Get conversation statistics
  getStats() {
    return {
      totalConversations: this.chatMemories.length,
      totalKnowledge: this.knowledgeBase.length,
      averageConfidence: this.knowledgeBase.reduce((sum, kb) => sum + kb.confidence, 0) / this.knowledgeBase.length || 0,
      topics: [...new Set(this.knowledgeBase.map(kb => kb.topic))],
      recentActivity: this.chatMemories.slice(-10)
    };
  }

  // Clear all data (for testing)
  clearAllData() {
    this.chatMemories = [];
    this.knowledgeBase = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Export singleton instance
export const ragSystem = new RAGSystem();

// Helper function to integrate with chat system
export const enhanceResponseWithRAG = async (question: string, topic: string, originalResponse: string): Promise<string> => {
  const relevantKnowledge = ragSystem.retrieveRelevantKnowledge(question, topic);
  
  if (relevantKnowledge.length > 0) {
    // Enhance response with relevant knowledge
    const knowledgeContext = relevantKnowledge
      .map(kb => `- ${kb.content}`)
      .join('\n');
    
    return `${originalResponse}\n\n💡 Additional insights:\n${knowledgeContext}`;
  }
  
  return originalResponse;
};

// Helper function to store chat for learning
export const storeChatForLearning = (question: string, answer: string, topic: string, context: string) => {
  ragSystem.storeChatMemory(question, answer, topic, context);
};

// Helper function to rate responses
export const rateResponse = (questionId: string, rating: 'good' | 'bad' | 'neutral') => {
  ragSystem.rateResponse(questionId, rating);
};
