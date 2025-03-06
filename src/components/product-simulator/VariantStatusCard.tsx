
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductVariant } from '@/contexts/ProductContext';

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
            <Badge className="bg-blue-500">
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
      >
        {disableButton ? "Unavailable" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default VariantStatusCard;
