
import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import TooltipWrapper from '../TooltipWrapper';

interface LaunchDateInfoProps {
  date: string | null;
}

const LaunchDateInfo: React.FC<LaunchDateInfoProps> = ({ date }) => {
  if (!date) return null;
  
  const dateObj = new Date(date);
  const isFuture = dateObj > new Date();
  
  const tooltipContent = (
    <p className="text-xs">
      {isFuture 
        ? "Future launch date triggers 'Pre-Order' status" 
        : "Launch date has passed"}
    </p>
  );
  
  return (
    <TooltipWrapper content={tooltipContent}>
      <div className="flex items-center text-xs text-blue-600 mt-1 cursor-help">
        <Calendar size={12} className="mr-1" />
        Launch: {format(dateObj, 'MMM d, yyyy')}
      </div>
    </TooltipWrapper>
  );
};

export default LaunchDateInfo;
