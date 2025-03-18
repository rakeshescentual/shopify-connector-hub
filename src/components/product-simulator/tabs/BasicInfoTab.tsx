
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProductContext } from '@/contexts/ProductContext';

const BasicInfoTab = () => {
  const { editableVariant, handleVariantChange } = useProductContext();

  if (!editableVariant) return null;
  
  const handleMetafieldChange = (key: string, value: string) => {
    handleVariantChange(`metafields.${key}`, value);
  };

  const isLaunchDateInFuture = editableVariant.launchDate 
    ? new Date(editableVariant.launchDate) > new Date() 
    : false;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="variant-title" className="text-sm font-medium">Variant Title</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right">
              The title displayed for this product variant
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="variant-title"
          value={editableVariant.title} 
          onChange={(e) => handleVariantChange('title', e.target.value)} 
          className="transition-all focus:ring-1 bg-white/70"
        />
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="variant-discontinued" className="text-sm font-medium">Discontinued Status</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <div className="space-y-1">
                <p><strong>No</strong>: Available from supplier, we are happy to hold stock</p>
                <p><strong>By Manufacturer</strong>: Not Available from supplier</p>
                <p><strong>By Us</strong>: Available but marked down</p>
                <p><strong>Special Order</strong>: Available, slow sales, min order qty = 1</p>
                <p><strong>Delisted</strong>: Available, slow sales, min order qty {'>'}  1</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select 
          value={String(editableVariant.metafields['custom.discontinued'])}
          onValueChange={(value) => handleMetafieldChange('custom.discontinued', value)}
        >
          <SelectTrigger id="variant-discontinued" className="w-full bg-white/70">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="By Manufacturer">By Manufacturer</SelectItem>
            <SelectItem value="By Us">By Us</SelectItem>
            <SelectItem value="Special Order">Special Order</SelectItem>
            <SelectItem value="Delisted">Delisted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className={`p-4 rounded-md border ${isLaunchDateInFuture ? 'bg-blue-50 border-blue-200' : 'bg-white/70 border-border'}`}>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="variant-launchdate" className={`text-sm font-medium ${isLaunchDateInFuture ? 'text-blue-700' : ''}`}>
            Launch Date
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Calendar size={14} className={`cursor-help ${isLaunchDateInFuture ? 'text-blue-500' : 'text-muted-foreground'}`} />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <div className="space-y-2">
                <p>Set for future launches to enable pre-order status</p>
                {isLaunchDateInFuture && (
                  <p className="text-blue-600 font-medium">
                    This variant has a future launch date and will trigger preproduct_preorder_launch status
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="variant-launchdate"
          type="date" 
          value={editableVariant.launchDate || ''} 
          onChange={(e) => handleVariantChange('launchDate', e.target.value || null)} 
          className={`transition-all focus:ring-1 ${isLaunchDateInFuture ? 'border-blue-300 bg-white' : 'bg-white/70'}`}
        />
        {editableVariant.launchDate && (
          <div className="mt-2 text-xs">
            {isLaunchDateInFuture ? (
              <div className="text-blue-600 flex items-center gap-1">
                <Calendar size={12} />
                <span>Future launch date will trigger pre-order status</span>
              </div>
            ) : (
              <div className="text-gray-500">
                Past launch date
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoTab;
