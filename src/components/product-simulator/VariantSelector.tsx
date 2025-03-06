
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';
import { Badge } from '@/components/ui/badge';

const VariantSelector = () => {
  const { 
    product, 
    selectedVariantId, 
    setSelectedVariantId, 
    addVariant
  } = useProductContext();

  // Helper function to render status icon
  const getStatusIcon = (status?: string) => {
    switch(status) {
      case 'active':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-amber-500" />;
      default:
        return null;
    }
  };

  // Helper function to get status tooltip text
  const getStatusTooltip = (status?: string) => {
    switch(status) {
      case 'active':
        return 'Processed and active';
      case 'inactive':
        return 'Processing failed or inactive';
      case 'pending':
        return 'Awaiting processing';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="w-3/4">
        <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
          <SelectTrigger className="bg-background/80 backdrop-blur-sm border-primary/20">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            {product.variants.map(variant => (
              <SelectItem key={variant.id} value={variant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex-shrink-0">{getStatusIcon(variant.status)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getStatusTooltip(variant.status)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <span className="flex items-center gap-1">
                    {variant.title}
                    {variant.inventory <= 0 && (
                      <Badge variant="outline" className="ml-1 text-xs py-0 h-4">
                        Out of Stock
                      </Badge>
                    )}
                  </span>
                </div>
                
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="w-1/4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10" 
              onClick={addVariant}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new variant to test different product conditions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default VariantSelector;
