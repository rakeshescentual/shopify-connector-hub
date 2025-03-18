
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Info, AlertCircle, ShoppingBag, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProductContext } from '@/contexts/ProductContext';

const InventoryTab = () => {
  const { editableVariant, handleVariantChange } = useProductContext();

  if (!editableVariant) return null;
  
  const handleMetafieldChange = (key: string, value: string | number) => {
    if (key === 'custom.ordering_min_qty') {
      handleVariantChange(`metafields.${key}`, typeof value === 'number' ? value : parseInt(String(value)) || 0);
    } else {
      handleVariantChange(`metafields.${key}`, String(value));
    }
  };

  const isSpecialOrderEligible = 
    editableVariant.inventory <= 0 && 
    editableVariant.metafields['custom.discontinued'] !== 'By Manufacturer' &&
    editableVariant.metafields['custom.ordering_min_qty'] === 1;

  const isNotifyMeEligible = 
    editableVariant.inventory <= 0 && 
    editableVariant.metafields['custom.discontinued'] !== 'By Manufacturer' && 
    editableVariant.metafields['custom.discontinued'] !== 'Delisted' &&
    editableVariant.backorderWeeks >= 4;

  const isBackorderEligible = 
    editableVariant.inventory <= 0 && 
    editableVariant.metafields['custom.discontinued'] !== 'By Manufacturer' && 
    editableVariant.metafields['custom.discontinued'] !== 'Delisted';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor="variant-inventory" className="text-sm font-medium">Current Inventory</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={14} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right">
                Available quantity in stock
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="variant-inventory"
            type="number" 
            value={editableVariant.inventory} 
            onChange={(e) => handleVariantChange('inventory', parseInt(e.target.value) || 0)} 
            className="transition-all focus:ring-1 bg-white/70"
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label 
              htmlFor="variant-min-qty" 
              className={`text-sm font-medium ${isSpecialOrderEligible ? 'text-amber-700' : ''}`}
            >
              Minimum Order Quantity
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <ShoppingBag 
                  size={14} 
                  className={isSpecialOrderEligible ? 'text-amber-500 cursor-help' : 'text-muted-foreground cursor-help'} 
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2">
                  <p>Minimum purchase quantity required (minimum value: 1)</p>
                  {isSpecialOrderEligible && (
                    <p className="text-amber-600 font-medium">
                      Setting this to 1 enables special order status for out-of-stock items
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="variant-min-qty"
            type="number" 
            min="1"
            value={editableVariant.metafields['custom.ordering_min_qty']} 
            onChange={(e) => handleMetafieldChange('custom.ordering_min_qty', parseInt(e.target.value))} 
            className={`transition-all focus:ring-1 ${isSpecialOrderEligible ? 'border-amber-300 bg-amber-50' : 'bg-white/70'}`}
          />
          {isSpecialOrderEligible && (
            <div className="mt-1 text-xs text-amber-600 flex items-center gap-1">
              <ShoppingBag size={12} />
              <span>Meets special order criteria</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-white/70 rounded-md border border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="variant-had-stock" className="text-sm font-medium">Had Stock Before</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Has this variant ever been in stock?
            </p>
          </div>
          <Switch 
            id="variant-had-stock"
            checked={editableVariant.hadStockBefore} 
            onCheckedChange={(checked) => handleVariantChange('hadStockBefore', checked)} 
          />
        </div>
      </div>
      
      <div className={`p-4 rounded-md border ${isNotifyMeEligible ? 'bg-purple-50 border-purple-200' : (isBackorderEligible ? 'bg-amber-50 border-amber-200' : 'bg-white/70 border-border')}`}>
        <div className="flex items-center gap-2 mb-1">
          <Label 
            htmlFor="variant-backorder-weeks" 
            className={`text-sm font-medium ${isNotifyMeEligible ? 'text-purple-700' : (isBackorderEligible ? 'text-amber-700' : '')}`}
          >
            Weeks in Backorder
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Clock 
                size={14} 
                className={`cursor-help ${isNotifyMeEligible ? 'text-purple-500' : (isBackorderEligible ? 'text-amber-500' : 'text-muted-foreground')}`} 
              />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <div className="space-y-2">
                <p>Number of consecutive weeks this item has been in backorder</p>
                {isNotifyMeEligible && (
                  <p className="text-purple-600 font-medium">
                    This variant has been in backorder for {editableVariant.backorderWeeks} weeks and qualifies for notify me status
                  </p>
                )}
                {isBackorderEligible && !isNotifyMeEligible && (
                  <p className="text-amber-600 font-medium">
                    This variant is eligible for backorder status
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="variant-backorder-weeks"
          type="number" 
          value={editableVariant.backorderWeeks} 
          onChange={(e) => handleVariantChange('backorderWeeks', parseInt(e.target.value) || 0)} 
          className={`transition-all focus:ring-1 ${isNotifyMeEligible ? 'border-purple-300 bg-white' : (isBackorderEligible ? 'border-amber-300 bg-white' : 'bg-white/70')}`}
        />
        {isNotifyMeEligible ? (
          <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
            <AlertCircle size={14} />
            <span>After 4 weeks in backorder, notify me status is applied</span>
          </div>
        ) : (
          <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
            <AlertCircle size={14} />
            <span>After 4 consecutive weeks, "Notify Me" status will be applied</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTab;
