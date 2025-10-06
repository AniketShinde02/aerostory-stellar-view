import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import AeroVerse from "./pages/AeroVerse";
import StoryPage from "./pages/StoryPage";
import SunnyStory from "./pages/SunnyStory";
import Stories from "./pages/Stories";
import SunnyAdventureStory from "./pages/SunnyAdventureStory";
import Resources from "./pages/Resources";
import SkeletonDemo from "./components/SkeletonDemo";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import BackgroundMusic from "./components/BackgroundMusic";
import WelcomePopup from "./components/WelcomePopup";
import RAGDashboard from "./components/RAGDashboard";

// Create optimized query client with caching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2, // Reduced retries to prevent hanging
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 15000), // Reduced max delay
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: 'online', // Only run queries when online
    },
    mutations: {
      retry: 1, // Reduced mutation retries
      networkMode: 'online',
    },
  },
});

const App = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome popup before
    const hasSeen = localStorage.getItem('aerostory-welcome-seen');
    if (!hasSeen) {
      setShowWelcomePopup(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('aerostory-welcome-seen', 'true');
  };

  const handleStartChat = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('aerostory-welcome-seen', 'true');
    // Trigger chatbot to open
    setTimeout(() => {
      const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
      if (chatButton) {
        chatButton.click();
      }
    }, 100);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/aeroverse" element={<AeroVerse />} />
              <Route path="/sunny-adventure-story" element={<SunnyAdventureStory />} />
              <Route path="/sunny-adventure" element={<SunnyStory />} />
              <Route path="/story/:storyId" element={<StoryPage />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/skeleton-demo" element={<SkeletonDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
                     <ChatBot />
                     <BackgroundMusic />
                     <RAGDashboard />
                     {showWelcomePopup && (
                       <WelcomePopup 
                         onClose={handleCloseWelcome}
                         onStartChat={handleStartChat}
                       />
                     )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
