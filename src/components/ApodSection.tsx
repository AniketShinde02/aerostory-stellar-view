import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Clock, ExternalLink, RefreshCw, Calendar, Image as ImageIcon, Video, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useApod } from "@/hooks/useNasaApi";
import ErrorBoundary from "./ErrorBoundary";

interface ApodSectionProps {
  id: string;
}

const ApodSection = ({ id }: ApodSectionProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { data: apodData, isLoading, error, refetch, isFetching } = useApod();

  // Truncate explanation for better UI
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header Skeleton */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
            <Skeleton className="h-12 md:h-16 lg:h-20 xl:h-24 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
            {/* Image/Video Skeleton */}
            <div className="lg:col-span-3">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
                <Skeleton className="aspect-video w-full rounded-lg" />
              </Card>
            </div>

            {/* Description Skeleton */}
            <div className="lg:col-span-2 space-y-4 xs:space-y-6">
              <div>
                <Skeleton className="h-8 w-1/2 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
                <Skeleton className="h-6 w-1/3 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <Card className="bg-red-500/10 border-red-500/20 p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <Camera className="w-12 h-12 text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Failed to load APOD
                  </h3>
                  <p className="text-red-300/80 text-sm mb-4">
                    Unable to fetch today's astronomy picture. Please try again.
                  </p>
                </div>
                <Button onClick={() => refetch()} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </Card>
          </ErrorBoundary>
        </div>
      </section>
    );
  }

  if (!apodData) return null;

  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight mb-3 xs:mb-4">
            Astronomy Picture of the Day
          </h2>
          <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, 
            along with a brief explanation written by a professional astronomer.
          </p>
        </div>

        {/* APOD Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
          {/* Image/Video - Larger */}
          <div className="lg:col-span-3">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 overflow-hidden">
              <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
                
                {apodData.media_type === 'image' ? (
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                ) : (
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className={`w-full h-full transition-opacity duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setImageLoading(false)}
                  />
                )}
                
                {/* Media Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`flex items-center gap-2 text-xs ${
                    apodData.media_type === 'image' 
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {apodData.media_type === 'image' ? (
                      <ImageIcon className="w-3 h-3" />
                    ) : (
                      <Video className="w-3 h-3" />
                    )}
                    {apodData.media_type.charAt(0).toUpperCase() + apodData.media_type.slice(1)}
                  </Badge>
                </div>

                {/* HD Link */}
                {apodData.hdurl && (
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-black/50 border-white/20 text-white hover:bg-white/10 h-8 px-3"
                      onClick={() => window.open(apodData.hdurl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      HD
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Description - Smaller sidebar */}
          <div className="lg:col-span-2 space-y-4 xs:space-y-6">
            {/* Title and Date */}
            <div>
              <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                <div className="p-2 xs:p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <Camera className="w-4 h-4 xs:w-5 xs:h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm xs:text-base font-semibold text-primary">Today's Image</h3>
                  <p className="text-xs xs:text-sm text-foreground/60">Astronomy Picture of the Day</p>
                </div>
              </div>
              
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 xs:mb-4">
                {apodData.title}
              </h4>
              
              <div className="flex items-center gap-4 xs:gap-6 mb-4 xs:mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm xs:text-base text-foreground/70">
                    {new Date(apodData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  Daily Update
                </Badge>
              </div>
            </div>

            {/* Explanation with Progressive Disclosure */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h5 className="text-sm xs:text-base font-semibold text-primary">Explanation</h5>
                {apodData.explanation.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary hover:text-primary/80 h-8 px-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show More
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="text-sm xs:text-base text-foreground/80 leading-relaxed">
                {isExpanded ? apodData.explanation : truncateText(apodData.explanation)}
              </p>
            </Card>

            {/* Copyright */}
            {apodData.copyright && (
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
                <h5 className="text-sm xs:text-base font-semibold text-primary mb-2 xs:mb-3">Copyright</h5>
                <p className="text-xs xs:text-sm text-foreground/70">
                  {apodData.copyright}
                </p>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
              <Button
                onClick={() => window.open(apodData.url, '_blank')}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Image
              </Button>
              {apodData.hdurl && (
                <Button
                  onClick={() => window.open(apodData.hdurl, '_blank')}
                  variant="outline"
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  HD Version
                </Button>
              )}
            </div>

            {/* Refresh Button */}
            <div className="flex items-center justify-between pt-4 xs:pt-6 border-t border-primary/20">
              <div className="flex items-center gap-2 xs:gap-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs xs:text-sm text-foreground/70">
                  Last updated: {new Date(apodData.fetchedAt).toLocaleTimeString()}
                </span>
              </div>
              <Button 
                onClick={() => refetch()} 
                variant="outline" 
                size="sm"
                disabled={isFetching}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Updating...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 xs:mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6">
            <Camera className="w-4 h-4 xs:w-5 xs:h-5 text-primary" />
            <span className="text-sm xs:text-base text-foreground/70">
              New image every day from NASA's APOD
            </span>
          </div>
          <p className="text-xs xs:text-sm text-foreground/60 leading-relaxed max-w-2xl mx-auto">
            The Astronomy Picture of the Day (APOD) is a website provided by NASA and Michigan Technological University. 
            Each day a different image or photograph of our universe is featured, along with a brief explanation by a professional astronomer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApodSection;