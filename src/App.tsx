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

// Create optimized query client with caching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

const App = () => (
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
