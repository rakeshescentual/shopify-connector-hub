
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock4, Code, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Pre-scheduled job mockup data
const mockScheduledJobs = [
  { id: 'job1', name: 'Daily Product Sync', frequency: 'daily', lastRun: '2023-06-15 08:00 AM', status: 'completed' },
  { id: 'job2', name: 'Weekly Tag Cleanup', frequency: 'weekly', lastRun: '2023-06-12 12:00 PM', status: 'completed' },
  { id: 'job3', name: 'Monthly Analytics', frequency: 'monthly', lastRun: '2023-06-01 03:00 AM', status: 'failed' }
];

const ScheduleBuilderDemo = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockScheduledJobs);
  const [isRunningJob, setIsRunningJob] = useState<string | null>(null);

  const handleRunNow = (jobId: string) => {
    setIsRunningJob(jobId);
    
    // Simulate job execution
    setTimeout(() => {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, lastRun: new Date().toLocaleString(), status: 'completed' } 
            : job
        )
      );
      setIsRunningJob(null);
      
      toast({
        title: "Job Executed Successfully",
        description: "The scheduled job has been executed manually",
        variant: "default" // Changed from 'success' to 'default' to match allowed variants
      });
    }, 2000);
  };

  return (
    <Card className="shadow-lg border-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Schedule Builder Demo
        </CardTitle>
        <CardDescription>
          Create and manage time-based jobs for Shopify product processing
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{job.name}</h4>
                  <Badge variant={job.status === 'completed' ? 'outline' : 'destructive'} className="text-xs">
                    {job.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock4 className="h-3 w-3" />
                  <span>Runs {job.frequency}</span>
                  <span>•</span>
                  <span>Last run: {job.lastRun}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRunNow(job.id)}
                disabled={isRunningJob === job.id}
              >
                {isRunningJob === job.id ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Code className="h-3 w-3 mr-1" />
                    Run Now
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          <span>Powered by Gadget.dev Schedule Builder</span>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-3 w-3 mr-1" />
          Create New Job
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleBuilderDemo;
