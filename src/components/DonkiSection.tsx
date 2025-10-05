import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Clock, AlertTriangle, Activity, RefreshCw, Calendar, Filter, Search } from "lucide-react";
import { useDonkiSolarFlares } from "@/hooks/useNasaApi";
import ErrorBoundary from "./ErrorBoundary";
import { useState } from "react";

interface DonkiSectionProps {
  id: string;
}

const DonkiSection = ({ id }: DonkiSectionProps) => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sevenDaysAgo.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);

  const { data: donkiData, isLoading, error, refetch, isFetching } = useDonkiSolarFlares(startDate, endDate);

  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'severe':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'monitoring':
      case 'moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'quiet':
      case 'none':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header Skeleton */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
            <Skeleton className="h-12 md:h-16 lg:h-20 xl:h-24 w-2/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>

          {/* Status Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mb-8 xs:mb-10 sm:mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
                <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
                <Skeleton className="h-6 w-1/3 rounded-full" />
              </Card>
            ))}
          </div>

          {/* Solar Flares List Skeleton */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6">
            <div className="flex items-center justify-between mb-4 xs:mb-6">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-20 rounded" />
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card/30 rounded-lg">
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
                <AlertTriangle className="w-12 h-12 text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Failed to load solar flare data
                  </h3>
                  <p className="text-red-300/80 text-sm mb-4">
                    Unable to fetch DONKI data. Please try again.
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

  if (!donkiData) return null;

  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight mb-3 xs:mb-4">
            Solar Flare Activity
          </h2>
          <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Real-time solar flare data from NASA's DONKI (Database of Notification of Knowledge Items) system. 
            Track solar activity and space weather events as they happen.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 mb-8 xs:mb-10 sm:mb-12">
          {/* Current Status */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
              <div className="p-2 xs:p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                <Activity className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm xs:text-base font-semibold text-primary">Current Status</h3>
                <p className="text-xs xs:text-sm text-foreground/60">Solar activity level</p>
              </div>
            </div>
            <Badge className={`w-full justify-center text-sm ${getStatusColor(donkiData.status)}`}>
              {donkiData.status.charAt(0).toUpperCase() + donkiData.status.slice(1)}
            </Badge>
          </Card>

          {/* Alert Level */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
              <div className="p-2 xs:p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm xs:text-base font-semibold text-primary">Alert Level</h3>
                <p className="text-xs xs:text-sm text-foreground/60">Space weather alert</p>
              </div>
            </div>
            <Badge className={`w-full justify-center text-sm ${getStatusColor(donkiData.alertLevel)}`}>
              {donkiData.alertLevel.charAt(0).toUpperCase() + donkiData.alertLevel.slice(1)}
            </Badge>
          </Card>

          {/* Last Update */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
              <div className="p-2 xs:p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                <Clock className="w-4 h-4 xs:w-5 xs:h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm xs:text-base font-semibold text-primary">Last Update</h3>
                <p className="text-xs xs:text-sm text-foreground/60">Data refresh time</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm xs:text-base font-semibold text-white">
                {new Date(donkiData.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </Card>
        </div>

        {/* Date Filter Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">Filter by Date Range</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick Date Presets */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-foreground/70">Quick Filters</Label>
              <div className="flex flex-col gap-2">
                <Button
                  variant={!isCustomDateRange ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setIsCustomDateRange(false);
                    const today = new Date();
                    setEndDate(today.toISOString().split('T')[0]);
                    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
                  }}
                >
                  Last 7 Days
                </Button>
                <Button
                  variant={isCustomDateRange ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsCustomDateRange(true)}
                >
                  Custom Range
                </Button>
              </div>
            </div>

            {/* Custom Date Range */}
            {isCustomDateRange && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="start-date" className="text-sm text-foreground/70">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate}
                    className="bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="end-date" className="text-sm text-foreground/70">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    min={startDate}
                    className="bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => refetch()}
                    variant="default"
                    size="sm"
                    disabled={isFetching}
                    className="w-full"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isFetching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Date Range Display */}
          {donkiData.dateRange && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground/70">Showing data from:</span>
                <span className="font-semibold text-primary">
                  {new Date(donkiData.dateRange.start).toLocaleDateString()} to {new Date(donkiData.dateRange.end).toLocaleDateString()}
                </span>
                {donkiData.totalFound !== undefined && (
                  <Badge variant="outline" className="ml-auto">
                    {donkiData.totalFound} flares found
                  </Badge>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Solar Flares List */}
        <div className="space-y-4 xs:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg xs:text-xl font-semibold text-primary">
              Solar Flares ({donkiData.solarFlares.length})
            </h3>
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

          {donkiData.solarFlares.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {donkiData.solarFlares.slice(0, 6).map((flare, index) => (
                <Card key={flare.flrID || index} className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-6 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 xs:mb-4">
                    <div className="flex items-center gap-2 xs:gap-3">
                      <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                        <Zap className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="text-sm xs:text-base font-semibold text-white">{flare.flrID}</h4>
                        <p className="text-xs xs:text-sm text-foreground/60">Solar Flare</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor('active')}`}>
                      {flare.classType}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 xs:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs xs:text-sm text-foreground/70">Peak Time</span>
                      <span className="text-xs xs:text-sm font-semibold text-white">
                        {new Date(flare.peakTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs xs:text-sm text-foreground/70">Duration</span>
                      <span className="text-xs xs:text-sm font-semibold text-white">
                        {flare.beginTime && flare.endTime ? 
                          `${Math.round((new Date(flare.endTime).getTime() - new Date(flare.beginTime).getTime()) / (1000 * 60))} min` : 
                          'Unknown'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs xs:text-sm text-foreground/70">Source</span>
                      <span className="text-xs xs:text-sm font-semibold text-white truncate ml-2">
                        {flare.sourceLocation || 'Unknown'}
                      </span>
                    </div>
                    {flare.activeRegionNum && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs xs:text-sm text-foreground/70">Active Region</span>
                        <span className="text-xs xs:text-sm font-semibold text-white">
                          AR{flare.activeRegionNum}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-8 xs:p-12 text-center">
              <div className="flex flex-col items-center gap-4 xs:gap-6">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full">
                  <Zap className="w-8 h-8 xs:w-10 xs:h-10 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl font-semibold text-white mb-2">No Solar Flares Detected</h3>
                  <p className="text-sm xs:text-base text-foreground/70">
                    The Sun is currently quiet with no significant solar flare activity.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 xs:mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-4 xs:mb-6">
            <Clock className="w-4 h-4 xs:w-5 xs:h-5 text-primary" />
            <span className="text-sm xs:text-base text-foreground/70">
              Data refreshes every 2 minutes from NASA DONKI
            </span>
          </div>
          <p className="text-xs xs:text-sm text-foreground/60 leading-relaxed max-w-2xl mx-auto">
            Solar flare data provided by NASA's Space Weather Database Of Notifications, Knowledge, Information (DONKI). 
            This system tracks solar events that could impact space weather and Earth's magnetosphere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonkiSection;