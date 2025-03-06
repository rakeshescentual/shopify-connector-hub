
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductVariant } from '@/contexts/ProductContext';
import { Clock, AlertCircle, Bell } from 'lucide-react';

interface VariantStatusCardProps {
  variant: ProductVariant;
}

const VariantStatusCard: React.FC<VariantStatusCardProps> = ({ variant }) => {
  const isOutOfStock = variant.inventory <= 0;
  const isDiscontinued = variant.metafields['custom.discontinued'] === 'By Manufacturer' || 
                         variant.metafields['custom.discontinued'] === 'Delisted';
  const disableButton = variant.metafields.auto_preproduct_disablebutton === 'yes';
  
  const activeMetafield = Object.entries(variant.metafields)
    .find(([key, value]) => key.startsWith('auto_preproduct_preorder') && 
                        key !== 'auto_preproduct_disablebutton' && 
                        value === 'yes');
  
  const status = activeMetafield ? 
    activeMetafield[0].replace('auto_', '') : 
    (isOutOfStock ? 'Out of Stock' : 'In Stock');
  
  // Determine button text and status based on active metafield
  let buttonText = "Add to Cart";
  let buttonIcon = null;
  
  if (disableButton) {
    buttonText = "Unavailable";
  } else if (activeMetafield) {
    const metafieldKey = activeMetafield[0];
    
    if (metafieldKey === 'auto_preproduct_preorder_notifyme') {
      buttonText = "Notify Me";
      buttonIcon = <Bell size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder_backorder') {
      buttonText = "Backorder";
      buttonIcon = <Clock size={14} className="mr-1.5" />;
    } else if (metafieldKey === 'auto_preproduct_preorder') {
      buttonText = "Pre-Order";
    } else if (metafieldKey === 'auto_preproduct_preorder_launch') {
      buttonText = "Pre-Order";
    } else if (metafieldKey === 'auto_preproduct_preorder_specialorder') {
      buttonText = "Special Order";
      buttonIcon = <AlertCircle size={14} className="mr-1.5" />;
    }
  }
    
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
            <Badge 
              className={
                activeMetafield[0] === 'auto_preproduct_preorder_notifyme' ? 'bg-purple-500' : 
                activeMetafield[0] === 'auto_preproduct_preorder_backorder' ? 'bg-amber-500' :
                activeMetafield[0] === 'auto_preproduct_preorder_launch' ? 'bg-blue-500' :
                activeMetafield[0] === 'auto_preproduct_preorder_specialorder' ? 'bg-orange-500' :
                activeMetafield[0] === 'auto_preproduct_preorder_discontinued' ? 'bg-red-500' :
                'bg-green-500'
              }
            >
              {activeMetafield[0].replace('auto_', '')}
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
        className={
          activeMetafield && activeMetafield[0] === 'auto_preproduct_preorder_notifyme' ? 'bg-purple-500 hover:bg-purple-600' : 
          activeMetafield && activeMetafield[0] === 'auto_preproduct_preorder_backorder' ? 'bg-amber-500 hover:bg-amber-600' :
          undefined
        }
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};

export default VariantStatusCard;
