
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductVariant } from '@/contexts/ProductContext';
import { 
  Clock, 
  AlertCircle, 
  Bell, 
  Ban, 
  Package, 
  Calendar, 
  Info,
  History
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from 'date-fns';

interface VariantStatusCardProps {
  variant: ProductVariant;
}

const VariantStatusCard: React.FC<VariantStatusCardProps> = ({ variant }) => {
  const isOutOfStock = variant.inventory <= 0;
  const isDiscontinued = variant.metafields['custom.discontinued'] === 'By Manufacturer' || 
                         variant.metafields['custom.discontinued'] === 'Delisted';
  
  // Disable button if:
  // 1. auto_preproduct_disablebutton is set to "yes" OR
  // 2. Discontinued (By Manufacturer or Delisted) AND out of stock
  const disableButton = variant.metafields.auto_preproduct_disablebutton === 'yes' || 
                       (isDiscontinued && isOutOfStock);
  
  // Get the active preproduct metafield (only one should be active at a time per variant)
  const activeMetafield = Object.entries(variant.metafields)
    .find(([key, value]) => key.startsWith('auto_preproduct_preorder') && 
                        key !== 'auto_preproduct_disablebutton' && 
                        value === 'yes');
  
  // Get a display-friendly status name
  const getStatusDisplayName = (metafieldKey: string): string => {
    switch(metafieldKey) {
      case 'auto_preproduct_preorder': return 'Pre-Order';
      case 'auto_preproduct_preorder_launch': return 'Launch Pre-Order';
      case 'auto_preproduct_preorder_specialorder': return 'Special Order';
      case 'auto_preproduct_preorder_backorder': return 'Backorder';
      case 'auto_preproduct_preorder_notifyme': return 'Notify Me';
      case 'auto_preproduct_preorder_discontinued': return 'Discontinued';
      default: return isOutOfStock ? 'Out of Stock' : 'In Stock';
    }
  };
  
  // Determine status display
  const status = activeMetafield ? 
    getStatusDisplayName(activeMetafield[0]) : 
    (isOutOfStock ? 'Out of Stock' : 'In Stock');
  
  // Determine button text and icon based on active metafield
  let buttonText = "Add to Cart";
  let buttonIcon = null;
  
  if (disableButton) {
    buttonText = "Unavailable";
    buttonIcon = <Ban size={14} className="mr-1.5" />;
  } else if (activeMetafield) {
    const metafieldKey = activeMetafield[0];
    
    if (metafieldKey === 'auto_preproduct_preorder_notifyme') {
      buttonText = "Notify Me";
      buttonIcon = <Bell size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder_backorder') {
      buttonText = "Backorder";
      buttonIcon = <Clock size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder_launch') {
      buttonText = "Pre-Order";
      buttonIcon = <Calendar size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder_specialorder') {
      buttonText = "Special Order";
      buttonIcon = <AlertCircle size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder') {
      buttonText = "Pre-Order";
      buttonIcon = <Package size={14} className="mr-1.5" />;
    }
  }
  
  // Determine badge color based on metafield
  const getBadgeClass = (metafieldKey: string): string => {
    switch(metafieldKey) {
      case 'auto_preproduct_preorder': return 'bg-green-500 hover:bg-green-600';
      case 'auto_preproduct_preorder_launch': return 'bg-blue-500 hover:bg-blue-600';
      case 'auto_preproduct_preorder_specialorder': return 'bg-orange-500 hover:bg-orange-600';
      case 'auto_preproduct_preorder_backorder': return 'bg-amber-500 hover:bg-amber-600';
      case 'auto_preproduct_preorder_notifyme': return 'bg-purple-500 hover:bg-purple-600';
      case 'auto_preproduct_preorder_discontinued': return 'bg-red-500 hover:bg-red-600';
      default: return '';
    }
  };
  
  // Format the last updated date if available
  const formattedLastUpdated = variant.lastUpdated 
    ? format(new Date(variant.lastUpdated), 'MMM d, yyyy h:mm a')
    : 'Not processed yet';
    
  return (
    <div className="p-3 border rounded-md space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{variant.title}</p>
          <div className="flex items-center gap-2 mt-1">
            {isOutOfStock ? (
              <Badge variant="outline" className="text-red-500 border-red-200">
                Out of Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-green-500 border-green-200">
                In Stock ({variant.inventory})
              </Badge>
            )}
            
            {activeMetafield && (
              <Badge className={getBadgeClass(activeMetafield[0])}>
                {getStatusDisplayName(activeMetafield[0])}
              </Badge>
            )}
            
            {isDiscontinued && (
              <Badge variant="destructive">
                Discontinued
              </Badge>
            )}
            
            {variant.status === 'pending' && (
              <Badge variant="outline" className="text-amber-500 border-amber-200">
                Pending
              </Badge>
            )}
            
            {variant.status === 'error' && (
              <Badge variant="destructive">
                Error
              </Badge>
            )}
          </div>
        </div>
        <Button 
          disabled={disableButton} 
          variant={disableButton ? "outline" : "default"}
          size="sm"
          className={activeMetafield ? getBadgeClass(activeMetafield[0]) : undefined}
        >
          {buttonIcon}
          {buttonText}
        </Button>
      </div>
      
      {/* Status message and last updated info */}
      {(variant.statusMessage || variant.lastUpdated) && (
        <div className="text-xs text-gray-500 flex items-start gap-1.5 mt-1">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          <div>
            {variant.statusMessage && <p>{variant.statusMessage}</p>}
            {variant.lastUpdated && (
              <p className="mt-0.5 flex items-center gap-1">
                <History size={10} />
                Last updated: {formattedLastUpdated}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Show backorder weeks if applicable */}
      {variant.backorderWeeks > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-amber-600 mt-1 cursor-help">
                <Clock size={12} className="mr-1" />
                {variant.backorderWeeks} week{variant.backorderWeeks !== 1 ? 's' : ''} backorder
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {variant.backorderWeeks >= 4 
                  ? "Extended backorder (4+ weeks) triggers 'Notify Me' status" 
                  : "Standard backorder period"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Show launch date if set */}
      {variant.launchDate && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-blue-600 mt-1 cursor-help">
                <Calendar size={12} className="mr-1" />
                Launch: {format(new Date(variant.launchDate), 'MMM d, yyyy')}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {new Date(variant.launchDate) > new Date() 
                  ? "Future launch date triggers 'Pre-Order' status" 
                  : "Launch date has passed"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default VariantStatusCard;
