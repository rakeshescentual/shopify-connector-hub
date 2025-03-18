
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusBadgeVariant = 'inStock' | 'outOfStock' | 'pending' | 'error' | 'discontinued' | 'preOrder' | 'specialOrder' | 'backorder' | 'notifyMe' | 'launch';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  text: string;
  count?: number;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, text, count }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'inStock':
        return 'text-green-500 border-green-200';
      case 'outOfStock':
        return 'text-red-500 border-red-200';
      case 'pending':
        return 'text-amber-500 border-amber-200';
      case 'error':
        return '';
      case 'discontinued':
        return '';
      case 'preOrder':
        return 'bg-green-500 hover:bg-green-600';
      case 'specialOrder':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'backorder':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'notifyMe':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'launch':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return '';
    }
  };

  if (variant === 'error' || variant === 'discontinued') {
    return <Badge variant="destructive">{text}</Badge>;
  }

  const isOutline = ['inStock', 'outOfStock', 'pending'].includes(variant);
  
  return (
    <Badge 
      variant={isOutline ? "outline" : "default"} 
      className={getVariantStyles()}
    >
      {text}{count !== undefined && variant === 'inStock' ? ` (${count})` : ''}
    </Badge>
  );
};

export default StatusBadge;
