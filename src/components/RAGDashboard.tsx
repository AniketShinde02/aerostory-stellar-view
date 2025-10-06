import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ragSystem } from '@/api/ragSystem';
import { 
  Brain, 
  TrendingUp, 
  Database, 
  MessageSquare, 
  Star,
  Trash2,
  RefreshCw,
  BarChart3
} from 'lucide-react';

interface RAGStats {
  totalConversations: number;
  totalKnowledge: number;
  averageConfidence: number;
  topics: string[];
  recentActivity: any[];
}

const RAGDashboard: React.FC = () => {
  const [stats, setStats] = useState<RAGStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      loadStats();
    }
  }, [isVisible]);

  const loadStats = () => {
    const ragStats = ragSystem.getStats();
    setStats(ragStats);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all learning data? This cannot be undone.')) {
      ragSystem.clearAllData();
      loadStats();
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
        title="RAG Learning Dashboard"
      >
        <Brain className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">RAG Learning Dashboard</h2>
                <p className="text-sm text-foreground/70">AI Learning & Knowledge Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={loadStats}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                title="Refresh Data"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Close Dashboard"
              >
                ×
              </Button>
            </div>
          </div>

          {stats && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-foreground/70">Total Conversations</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalConversations}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-foreground/70">Knowledge Items</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalKnowledge}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-foreground/70">Avg Confidence</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(stats.averageConfidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-sm text-foreground/70">Topics Learned</p>
                      <p className="text-2xl font-bold text-foreground">{stats.topics.length}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Learned Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {stats.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Recent Learning Activity</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/10">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          Q: {activity.question}
                        </p>
                        <p className="text-xs text-foreground/70">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.topic}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                <div className="text-sm text-foreground/70">
                  Last updated: {new Date().toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={clearAllData}
                    variant="destructive"
                    size="sm"
                    className="h-8"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All Data
                  </Button>
                  <Button
                    onClick={loadStats}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RAGDashboard;
