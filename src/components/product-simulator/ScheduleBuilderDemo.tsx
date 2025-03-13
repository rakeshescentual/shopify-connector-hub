import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Clock, Calendar, RotateCcw, Play, CheckCircle2 } from 'lucide-react';

/**
 * A demo component showcasing how Gadget.dev's Schedule Builder would work
 * with the PreProduct integration. This demonstrates a UI for scheduling
 * automated inventory and status updates.
 */
const ScheduleBuilderDemo = () => {
  const { toast } = useToast();
  const [frequency, setFrequency] = useState('hourly');
  const [enabled, setEnabled] = useState(false);
  const [scheduleActive, setScheduleActive] = useState(false);
  
  const handleScheduleToggle = () => {
    if (!scheduleActive) {
      toast({
        title: "Schedule Activated",
        description: `Product status updates will run ${frequency}.`,
      });
      setScheduleActive(true);
    } else {
      toast({
        title: "Schedule Deactivated",
        description: "Automated updates have been paused.",
        variant: "destructive",
      });
      setScheduleActive(false);
    }
  };
  
  const handleRunNow = () => {
    toast({
      title: "Manual Update Triggered",
      description: "Processing product statuses now...",
    });
    
    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Update Complete",
        description: "All products have been processed successfully.",
        variant: "default",
      });
    }, 1500);
  };
  
  return (
    <Card className="shadow-md border-primary/10">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle className="text-md">Gadget Schedule Builder</CardTitle>
        </div>
        <CardDescription>
          Configure automated product status updates using Gadget.dev's Schedule Builder
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-frequency">Update Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="schedule-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Every 15 minutes</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily (midnight)</SelectItem>
                <SelectItem value="weekly">Weekly (Sunday)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>Schedule Options</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch 
                  id="notify-changes" 
                  checked={enabled} 
                  onCheckedChange={setEnabled}
                />
                <Label htmlFor="notify-changes" className="font-normal text-sm">
                  Send email notifications on status changes
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded p-3 bg-amber-50 text-amber-800 text-sm">
          <div className="flex gap-2 items-start">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1 text-xs">Gadget.dev Schedule Builder</p>
              <p className="text-xs">
                In production, this UI would connect to Gadget.dev's Schedule Builder API
                to create and manage automated jobs that sync with Shopify and update
                product statuses based on inventory and date rules.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-muted/10 border-t">
        <Button variant="outline" size="sm" disabled={scheduleActive} onClick={handleRunNow} className="gap-1">
          <Play className="h-3.5 w-3.5" />
          Run Now
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            setFrequency('hourly');
            setEnabled(false);
            setScheduleActive(false);
          }} className="gap-1">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          
          <Button 
            variant={scheduleActive ? "destructive" : "default"} 
            size="sm" 
            onClick={handleScheduleToggle}
            className="gap-1"
          >
            {scheduleActive ? "Deactivate" : "Activate"} Schedule
            {scheduleActive && <CheckCircle2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScheduleBuilderDemo;
