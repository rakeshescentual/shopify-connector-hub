
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipWrapperProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ 
  content, 
  children, 
  side = 'right' 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
