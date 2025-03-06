
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductVariant } from '@/contexts/ProductContext';
import { Clock, AlertCircle, Bell, Ban, Package, Calendar } from 'lucide-react';

interface VariantStatusCardProps {
  variant: ProductVariant;
}

const VariantStatusCard: React.FC<VariantStatusCardProps> = ({ variant }) => {
  const isOutOfStock = variant.inventory <= 0;
  const isDiscontinued = variant.metafields['custom.discontinued'] === 'By Manufacturer' || 
                         variant.metafields['custom.discontinued'] === 'Delisted';
  const disableButton = variant.metafields.auto_preproduct_disablebutton === 'yes';
  
  // Get the active preproduct metafield (only one should be active at a time)
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
    } else if (metafieldKey === 'auto_preproduct_preorder') {
      buttonText = "Pre-Order";
      buttonIcon = <Package size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder_specialorder') {
      buttonText = "Special Order";
      buttonIcon = <AlertCircle size={14} className="mr-1.5" />;
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
    
  return (
    <div className="p-3 border rounded-md flex items-center justify-between">
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
  );
};

export default VariantStatusCard;
