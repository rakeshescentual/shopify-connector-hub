
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Package, 
  Ban 
} from 'lucide-react';

type ButtonStatus = 'default' | 'preOrder' | 'launch' | 'specialOrder' | 'backorder' | 'notifyMe' | 'unavailable';

interface StatusButtonProps {
  status: ButtonStatus;
  disabled: boolean;
  className?: string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ 
  status, 
  disabled,
  className
}) => {
  const getButtonContent = () => {
    switch (status) {
      case 'notifyMe':
        return (
          <>
            <Bell size={14} className="mr-1.5" />
            Notify Me
          </>
        );
      case 'backorder':
        return (
          <>
            <Clock size={14} className="mr-1.5" />
            Backorder
          </>
        );
      case 'launch':
        return (
          <>
            <Calendar size={14} className="mr-1.5" />
            Pre-Order
          </>
        );
      case 'specialOrder':
        return (
          <>
            <AlertCircle size={14} className="mr-1.5" />
            Special Order
          </>
        );
      case 'preOrder':
        return (
          <>
            <Package size={14} className="mr-1.5" />
            Pre-Order
          </>
        );
      case 'unavailable':
        return (
          <>
            <Ban size={14} className="mr-1.5" />
            Unavailable
          </>
        );
      default:
        return "Add to Cart";
    }
  };

  return (
    <Button 
      disabled={disabled} 
      variant={disabled ? "outline" : "default"}
      size="sm"
      className={className}
    >
      {getButtonContent()}
    </Button>
  );
};

export default StatusButton;
