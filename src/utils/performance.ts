// Performance optimization utilities

// Image optimization
export const optimizeImage = (url: string, width?: number, quality?: number) => {
  if (!url) return url;
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (quality) params.append('q', quality.toString());
  if (params.toString()) {
    return `${url}?${params.toString()}`;
  }
  return url;
};

// Lazy loading helper
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null;
  }
  
  const memory = (performance as any).memory;
  if (!memory) return null;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
  };
};

// Performance metrics
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    fn();
    return;
  }
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string) => {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

// Cache management
export const clearCache = async () => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }
  
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('Cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

// Bundle size optimization
export const getBundleSize = () => {
  if (typeof window === 'undefined') return null;
  
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  return {
    scripts: scripts.length,
    stylesheets: stylesheets.length,
    totalResources: scripts.length + stylesheets.length,
  };
};

// Network performance
export const getNetworkInfo = () => {
  if (typeof window === 'undefined' || !('navigator' in window)) {
    return null;
  }
  
  const connection = (navigator as any).connection;
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
};

// Core Web Vitals monitoring
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  console.error('Error tracked:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  });
};

// Performance budget
export const checkPerformanceBudget = () => {
  const budget = {
    maxBundleSize: 500, // KB
    maxImageSize: 200, // KB
    maxLoadTime: 3000, // ms
    maxLCP: 2500, // ms
    maxFID: 100, // ms
    maxCLS: 0.1,
  };
  
  return budget;
};

export default {
  optimizeImage,
  createIntersectionObserver,
  debounce,
  throttle,
  getMemoryUsage,
  measurePerformance,
  preloadResource,
  inlineCriticalCSS,
  registerServiceWorker,
  clearCache,
  getBundleSize,
  getNetworkInfo,
  measureCoreWebVitals,
  trackError,
  checkPerformanceBudget,
};
