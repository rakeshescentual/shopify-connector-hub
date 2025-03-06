
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Tag, ShoppingCart, RefreshCw } from 'lucide-react';
import VariantStatusCard from './VariantStatusCard';
import { useProductContext } from '@/contexts/ProductContext';

const ProductPreview = () => {
  const { product, isProcessing, applyPreProductLogic } = useProductContext();

  return (
    <Card className="glass-card border-none animate-slide-up">
      <CardHeader>
        <CardTitle>Product Preview</CardTitle>
        <CardDescription>
          See how the product would appear with PreProduct integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.variants.length} variants</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Product Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.length > 0 ? (
              product.tags.map(tag => (
                <Badge key={tag} className="flex items-center gap-1">
                  <Tag size={12} />
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tags applied</p>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Quick Buy Status:</h4>
          {product.auto_quickbuydisable === 'yes' ? (
            <div className="flex items-center text-sm text-amber-600">
              <AlertTriangle size={16} className="mr-2" />
              Quick Buy Disabled
            </div>
          ) : (
            <div className="flex items-center text-sm text-green-600">
              <ShoppingCart size={16} className="mr-2" />
              Quick Buy Enabled
            </div>
          )}
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-3">Variant Status:</h4>
          <div className="space-y-3">
            {product.variants.map(variant => (
              <VariantStatusCard key={variant.id} variant={variant} />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={applyPreProductLogic} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Apply PreProduct Logic'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductPreview;
