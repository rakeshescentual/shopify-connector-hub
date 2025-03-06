
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';

const VariantSelector = () => {
  const { 
    product, 
    selectedVariantId, 
    setSelectedVariantId, 
    addVariant
  } = useProductContext();

  return (
    <div className="flex gap-4 mb-6">
      <div className="w-3/4">
        <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
          <SelectTrigger className="bg-background/80 backdrop-blur-sm border-primary/20">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            {product.variants.map(variant => (
              <SelectItem key={variant.id} value={variant.id}>
                {variant.title}
                {variant.lastUpdated && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({new Date(variant.lastUpdated).toLocaleTimeString()})
                  </span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        variant="outline" 
        className="w-1/4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10" 
        onClick={addVariant}
      >
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  );
};

export default VariantSelector;
