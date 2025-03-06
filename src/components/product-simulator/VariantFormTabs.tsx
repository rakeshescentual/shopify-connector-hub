import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';

const VariantFormTabs = () => {
  const { editableVariant, handleVariantChange } = useProductContext();

  if (!editableVariant) return <div>Loading variant...</div>;
  
  const handleMetafieldChange = (key: string, value: string | number) => {
    if (key === 'custom.ordering_min_qty') {
      handleVariantChange(`metafields.${key}`, typeof value === 'number' ? value : parseInt(String(value)) || 0);
    } else {
      handleVariantChange(`metafields.${key}`, String(value));
    }
  };

  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="metafields">Metafields</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic">
        <div className="space-y-4">
          <div>
            <Label htmlFor="variant-title">Variant Title</Label>
            <Input 
              id="variant-title"
              value={editableVariant.title} 
              onChange={(e) => handleVariantChange('title', e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="variant-discontinued">Discontinued Status</Label>
            <Select 
              value={String(editableVariant.metafields['custom.discontinued'])}
              onValueChange={(value) => handleMetafieldChange('custom.discontinued', value)}
            >
              <SelectTrigger id="variant-discontinued">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="By Manufacturer">By Manufacturer</SelectItem>
                <SelectItem value="Delisted">Delisted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="variant-launchdate">Launch Date (if future)</Label>
            <Input 
              id="variant-launchdate"
              type="date" 
              value={editableVariant.launchDate || ''} 
              onChange={(e) => handleVariantChange('launchDate', e.target.value || null)} 
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="inventory">
        <div className="space-y-4">
          <div>
            <Label htmlFor="variant-inventory">Current Inventory</Label>
            <Input 
              id="variant-inventory"
              type="number" 
              value={editableVariant.inventory} 
              onChange={(e) => handleVariantChange('inventory', parseInt(e.target.value))} 
            />
          </div>
          
          <div>
            <Label htmlFor="variant-min-qty">Minimum Order Quantity</Label>
            <Input 
              id="variant-min-qty"
              type="number" 
              value={editableVariant.metafields['custom.ordering_min_qty']} 
              onChange={(e) => handleMetafieldChange('custom.ordering_min_qty', parseInt(e.target.value))} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="variant-had-stock">Had Stock Before</Label>
              <p className="text-xs text-gray-500">
                Has this variant ever been in stock?
              </p>
            </div>
            <Switch 
              id="variant-had-stock"
              checked={editableVariant.hadStockBefore} 
              onCheckedChange={(checked) => handleVariantChange('hadStockBefore', checked)} 
            />
          </div>
          
          <div>
            <Label htmlFor="variant-backorder-weeks">Weeks in Backorder</Label>
            <Input 
              id="variant-backorder-weeks"
              type="number" 
              value={editableVariant.backorderWeeks} 
              onChange={(e) => handleVariantChange('backorderWeeks', parseInt(e.target.value))} 
            />
            <p className="text-xs text-gray-500 mt-1">
              After 4 consecutive weeks, "Notify Me" status will be applied
            </p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="metafields">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md mb-2">
            <Info size={16} className="mr-2 text-amber-500" />
            <p className="text-xs">
              These fields are normally auto-calculated, but you can override them for testing
            </p>
          </div>
          
          {Object.entries(editableVariant.metafields)
            .filter(([key]) => key.startsWith('auto_preproduct_preorder'))
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`variant-${key}`}>
                  {key.replace('auto_', '')}
                </Label>
                <Select 
                  value={String(value)}
                  onValueChange={(newValue) => handleMetafieldChange(key, newValue)}
                >
                  <SelectTrigger id={`variant-${key}`} className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))
          }
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default VariantFormTabs;
