import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const SkeletonDemo = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Skeleton Loading Examples</h2>
        
        {/* Card Skeleton Example */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Card with Skeleton Loading</h3>
          
          <div className="space-y-4">
            {/* Header skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            
            {/* Button skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </Card>

        {/* List Skeleton Example */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">List with Skeleton Loading</h3>
          
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-card/30 rounded-lg">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </Card>

        {/* Image + Text Skeleton Example */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
          <h3 className="text-xl font-semibold mb-4">Image + Text Skeleton Loading</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SkeletonDemo;
