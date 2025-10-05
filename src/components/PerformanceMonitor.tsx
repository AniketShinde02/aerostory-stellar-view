import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  memoryUsage?: number;
  frameRate: number;
  isSlow: boolean;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    frameRate: 60,
    isSlow: false
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : undefined;

        setMetrics({
          frameRate: fps,
          memoryUsage,
          isSlow: fps < 30 // Consider slow if under 30 FPS
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Only show in development or when performance is poor
  if (process.env.NODE_ENV === 'production' && !metrics.isSlow) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded font-mono">
      {metrics.memoryUsage && (
        <div>{metrics.memoryUsage}MB</div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
