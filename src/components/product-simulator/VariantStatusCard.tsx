
import React from 'react';
import { ProductVariant } from '@/contexts/product/types';
import StatusBadge from './status/StatusBadge';
import StatusButton from './status/StatusButton';
import InfoMessage from './status/InfoMessage';
import BackorderInfo from './status/BackorderInfo';
import LaunchDateInfo from './status/LaunchDateInfo';

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
  
  // Determine status for button
  let buttonStatus = 'default';
  let buttonClass;
  
  if (disableButton) {
    buttonStatus = 'unavailable';
  } else if (activeMetafield) {
    const metafieldKey = activeMetafield[0];
    
    if (metafieldKey === 'auto_preproduct_preorder_notifyme') {
      buttonStatus = 'notifyMe';
    } else if (metafieldKey === 'auto_preproduct_preorder_backorder') {
      buttonStatus = 'backorder';
    } else if (metafieldKey === 'auto_preproduct_preorder_launch') {
      buttonStatus = 'launch';
    } else if (metafieldKey === 'auto_preproduct_preorder_specialorder') {
      buttonStatus = 'specialOrder';
    } else if (metafieldKey === 'auto_preproduct_preorder') {
      buttonStatus = 'preOrder';
    }
    
    // Determine button color based on metafield
    if (metafieldKey === 'auto_preproduct_preorder') {
      buttonClass = 'bg-green-500 hover:bg-green-600';
    } else if (metafieldKey === 'auto_preproduct_preorder_launch') {
      buttonClass = 'bg-blue-500 hover:bg-blue-600';
    } else if (metafieldKey === 'auto_preproduct_preorder_specialorder') {
      buttonClass = 'bg-orange-500 hover:bg-orange-600';
    } else if (metafieldKey === 'auto_preproduct_preorder_backorder') {
      buttonClass = 'bg-amber-500 hover:bg-amber-600';
    } else if (metafieldKey === 'auto_preproduct_preorder_notifyme') {
      buttonClass = 'bg-purple-500 hover:bg-purple-600';
    }
  }
    
  return (
    <div className="p-3 border rounded-md space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{variant.title}</p>
          <div className="flex items-center gap-2 mt-1">
            {/* Stock status badge */}
            {isOutOfStock ? (
              <StatusBadge variant="outOfStock" text="Out of Stock" />
            ) : (
              <StatusBadge variant="inStock" text="In Stock" count={variant.inventory} />
            )}
            
            {/* Pre-order status badge */}
            {activeMetafield && (
              <StatusBadge 
                variant={activeMetafield[0].includes('launch') ? 'launch' : 
                         activeMetafield[0].includes('specialorder') ? 'specialOrder' : 
                         activeMetafield[0].includes('backorder') ? 'backorder' : 
                         activeMetafield[0].includes('notifyme') ? 'notifyMe' : 'preOrder'} 
                text={getStatusDisplayName(activeMetafield[0])} 
              />
            )}
            
            {/* Discontinued badge */}
            {isDiscontinued && (
              <StatusBadge variant="discontinued" text="Discontinued" />
            )}
            
            {/* Pending badge */}
            {variant.status === 'pending' && (
              <StatusBadge variant="pending" text="Pending" />
            )}
            
            {/* Error badge */}
            {variant.status === 'error' && (
              <StatusBadge variant="error" text="Error" />
            )}
          </div>
        </div>
        
        {/* Button component */}
        <StatusButton 
          status={buttonStatus as any} 
          disabled={disableButton}
          className={buttonClass}
        />
      </div>
      
      {/* Status message and last updated info */}
      <InfoMessage 
        message={variant.statusMessage} 
        lastUpdated={variant.lastUpdated} 
      />
      
      {/* Backorder info */}
      <BackorderInfo weeks={variant.backorderWeeks} />
      
      {/* Launch date info */}
      <LaunchDateInfo date={variant.launchDate} />
    </div>
  );
};

export default VariantStatusCard;
