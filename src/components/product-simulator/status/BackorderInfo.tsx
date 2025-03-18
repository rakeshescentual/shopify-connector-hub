
import React from 'react';
import { Clock } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

interface BackorderInfoProps {
  weeks: number;
}

const BackorderInfo: React.FC<BackorderInfoProps> = ({ weeks }) => {
  if (weeks <= 0) return null;
  
  const tooltipContent = (
    <p className="text-xs">
      {weeks >= 4 
        ? "Extended backorder (4+ weeks) triggers 'Notify Me' status" 
        : "Standard backorder period"}
    </p>
  );
  
  return (
    <TooltipWrapper content={tooltipContent}>
      <div className="flex items-center text-xs text-amber-600 mt-1 cursor-help">
        <Clock size={12} className="mr-1" />
        {weeks} week{weeks !== 1 ? 's' : ''} backorder
      </div>
    </TooltipWrapper>
  );
};

export default BackorderInfo;
