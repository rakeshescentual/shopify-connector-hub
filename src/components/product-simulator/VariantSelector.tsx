import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, AlertCircle, CheckCircle, Clock, Info, Search } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const VariantSelector = () => {
  const { 
    product, 
    selectedVariantId, 
    setSelectedVariantId, 
    addVariant
  } = useProductContext();

  const [searchQuery, setSearchQuery] = useState('');

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
        return <Info className="h-3 w-3 text-gray-400" />;
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
        return 'No status available';
    }
  };

  // Get variant inventory status badge
  const getInventoryBadge = (variant) => {
    if (variant.inventory <= 0) {
      return (
        <Badge variant="outline" className="ml-1 text-xs py-0 h-4">
          Out of Stock
        </Badge>
      );
    }
    
    if (variant.inventory < 5) {
      return (
        <Badge variant="outline" className="ml-1 text-xs py-0 h-4 border-amber-300 text-amber-700">
          Low Stock
        </Badge>
      );
    }
    
    return null;
  };

  // Format timestamp in a more readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    // Return time if same day, otherwise date and time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Filter variants based on search query
  const filteredVariants = product.variants.filter(variant => 
    variant.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-4">
        <div className="w-3/4">
          <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-primary/20">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              {searchQuery.length > 0 && filteredVariants.length === 0 && (
                <div className="py-2 px-3 text-sm text-muted-foreground">
                  No variants match your search
                </div>
              )}
              
              <div className="p-2 sticky top-0 bg-background z-10">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search variants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
              </div>
              
              {(searchQuery.length > 0 ? filteredVariants : product.variants).map(variant => (
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
                      {getInventoryBadge(variant)}
                    </span>
                  </div>
                  
                  {variant.lastUpdated && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({formatTimestamp(variant.lastUpdated)})
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
      
      {product.variants.length > 5 && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          <span>
            {product.variants.length} variants available. 
            {searchQuery && filteredVariants.length < product.variants.length && 
              `Showing ${filteredVariants.length} matches for "${searchQuery}".`
            }
          </span>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
