
import React from 'react';
import { Info, History } from 'lucide-react';
import { format } from 'date-fns';

interface InfoMessageProps {
  message?: string;
  lastUpdated?: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message, lastUpdated }) => {
  if (!message && !lastUpdated) return null;
  
  const formattedLastUpdated = lastUpdated 
    ? format(new Date(lastUpdated), 'MMM d, yyyy h:mm a')
    : 'Not processed yet';
    
  return (
    <div className="text-xs text-gray-500 flex items-start gap-1.5 mt-1">
      <Info size={12} className="mt-0.5 flex-shrink-0" />
      <div>
        {message && <p>{message}</p>}
        {lastUpdated && (
          <p className="mt-0.5 flex items-center gap-1">
            <History size={10} />
            Last updated: {formattedLastUpdated}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoMessage;
