// Responsive design utilities and breakpoint helpers

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3840px',
} as const;

export const deviceTypes = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  ultrawide: '(min-width: 2560px)',
} as const;

// Hook to detect current device type
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'ultrawide'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else if (width < 2560) setDeviceType('desktop');
      else setDeviceType('ultrawide');
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceType;
};

// Responsive spacing utilities
export const getResponsiveSpacing = (deviceType: string) => {
  const spacing = {
    mobile: {
      padding: 'px-4 py-2',
      margin: 'mx-4 my-2',
      gap: 'gap-2',
      text: 'text-sm',
    },
    tablet: {
      padding: 'px-6 py-3',
      margin: 'mx-6 my-3',
      gap: 'gap-4',
      text: 'text-base',
    },
    desktop: {
      padding: 'px-8 py-4',
      margin: 'mx-8 my-4',
      gap: 'gap-6',
      text: 'text-lg',
    },
    ultrawide: {
      padding: 'px-12 py-6',
      margin: 'mx-12 my-6',
      gap: 'gap-8',
      text: 'text-xl',
    },
  };

  return spacing[deviceType as keyof typeof spacing] || spacing.desktop;
};

// Button responsive classes
export const getResponsiveButtonClasses = (deviceType: string) => {
  const buttonClasses = {
    mobile: 'px-4 py-2 text-sm min-h-[40px]',
    tablet: 'px-6 py-3 text-base min-h-[44px]',
    desktop: 'px-8 py-4 text-lg min-h-[48px]',
    ultrawide: 'px-10 py-5 text-xl min-h-[52px]',
  };

  return buttonClasses[deviceType as keyof typeof buttonClasses] || buttonClasses.desktop;
};

// Card responsive classes
export const getResponsiveCardClasses = (deviceType: string) => {
  const cardClasses = {
    mobile: 'p-4 rounded-lg',
    tablet: 'p-6 rounded-xl',
    desktop: 'p-8 rounded-xl',
    ultrawide: 'p-10 rounded-2xl',
  };

  return cardClasses[deviceType as keyof typeof cardClasses] || cardClasses.desktop;
};

// Grid responsive classes
export const getResponsiveGridClasses = (deviceType: string) => {
  const gridClasses = {
    mobile: 'grid-cols-1 gap-4',
    tablet: 'grid-cols-2 gap-6',
    desktop: 'grid-cols-3 gap-8',
    ultrawide: 'grid-cols-4 gap-10',
  };

  return gridClasses[deviceType as keyof typeof gridClasses] || gridClasses.desktop;
};

// Typography responsive classes
export const getResponsiveTextClasses = (deviceType: string, variant: 'heading' | 'body' | 'caption') => {
  const textClasses = {
    mobile: {
      heading: 'text-2xl md:text-3xl',
      body: 'text-sm md:text-base',
      caption: 'text-xs md:text-sm',
    },
    tablet: {
      heading: 'text-3xl md:text-4xl',
      body: 'text-base md:text-lg',
      caption: 'text-sm md:text-base',
    },
    desktop: {
      heading: 'text-4xl md:text-5xl',
      body: 'text-lg md:text-xl',
      caption: 'text-base md:text-lg',
    },
    ultrawide: {
      heading: 'text-5xl md:text-6xl',
      body: 'text-xl md:text-2xl',
      caption: 'text-lg md:text-xl',
    },
  };

  return textClasses[deviceType as keyof typeof textClasses]?.[variant] || textClasses.desktop[variant];
};

import { useState, useEffect } from 'react';
