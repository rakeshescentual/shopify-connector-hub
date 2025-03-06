import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, AlertCircle, Tag, Package, Calendar, ShoppingBag } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

const VariantFormTabs = () => {
  const { editableVariant, handleVariantChange } = useProductContext();

  if (!editableVariant) return <div className="p-4 text-center">Loading variant...</div>;
  
  const handleMetafieldChange = (key: string, value: string | number) => {
    if (key === 'custom.ordering_min_qty') {
      handleVariantChange(`metafields.${key}`, typeof value === 'number' ? value : parseInt(String(value)) || 0);
    } else {
      handleVariantChange(`metafields.${key}`, String(value));
    }
  };

  const isLaunchDateInFuture = editableVariant.launchDate 
    ? new Date(editableVariant.launchDate) > new Date() 
    : false;

  const isSpecialOrderEligible = 
    editableVariant.inventory <= 0 && 
    editableVariant.metafields['custom.discontinued'] !== 'By Manufacturer' &&
    editableVariant.metafields['custom.ordering_min_qty'] === 1;

  return (
    <TooltipProvider>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-3 bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="basic" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Tag size={16} />
            <span>Basic Info</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Package size={16} />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="metafields" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Info size={16} />
            <span>Metafields</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6 animate-fade-in">
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
                  <TooltipContent side="right">
                    Set the discontinued status for this variant
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
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6 animate-fade-in">
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
                        <p>Minimum purchase quantity required</p>
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
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="variant-backorder-weeks" className="text-sm font-medium">Weeks in Backorder</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Number of consecutive weeks this item has been in backorder
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                id="variant-backorder-weeks"
                type="number" 
                value={editableVariant.backorderWeeks} 
                onChange={(e) => handleVariantChange('backorderWeeks', parseInt(e.target.value) || 0)} 
                className="transition-all focus:ring-1 bg-white/70"
              />
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertCircle size={14} />
                After 4 consecutive weeks, "Notify Me" status will be applied
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="metafields" className="space-y-5 animate-fade-in">
          <div className="space-y-5">
            <div className="flex items-start p-3 bg-amber-50/70 backdrop-blur-sm rounded-md mb-4 border border-amber-200">
              <Info size={16} className="mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                These fields are normally auto-calculated, but you can override them for testing
              </p>
            </div>
            
            <div className="grid gap-4">
              {Object.entries(editableVariant.metafields)
                .filter(([key]) => key.startsWith('auto_preproduct_preorder'))
                .map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2.5 bg-white/70 rounded-md border border-border hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`variant-${key}`} className="text-sm font-medium">
                        {key.replace('auto_', '').replace(/_/g, ' ')}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {key === 'auto_preproduct_preorder' && 'General pre-order status'}
                          {key === 'auto_preproduct_preorder_launch' && 'Future launch date pre-order'}
                          {key === 'auto_preproduct_preorder_specialorder' && 'Special order status'}
                          {key === 'auto_preproduct_preorder_backorder' && 'Currently in backorder'}
                          {key === 'auto_preproduct_preorder_notifyme' && 'Long-term backorder status'}
                          {key === 'auto_preproduct_preorder_discontinued' && 'Discontinued by manufacturer'}
                          {key === 'auto_preproduct_disablebutton' && 'Disables the purchase button'}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select 
                      value={String(value)}
                      onValueChange={(newValue) => handleMetafieldChange(key, newValue)}
                    >
                      <SelectTrigger id={`variant-${key}`} className="w-28 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes" className="text-green-600 font-medium">Yes</SelectItem>
                        <SelectItem value="no" className="text-red-600 font-medium">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))
              }
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default VariantFormTabs;
