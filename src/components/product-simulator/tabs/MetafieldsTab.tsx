
import React from 'react';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProductContext } from '@/contexts/ProductContext';

const MetafieldsTab = () => {
  const { editableVariant, handleVariantChange } = useProductContext();

  if (!editableVariant) return null;
  
  const handleMetafieldChange = (key: string, value: string | number) => {
    handleVariantChange(`metafields.${key}`, value);
  };

  return (
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
            <MetafieldItem 
              key={key} 
              fieldKey={key} 
              value={String(value)} 
              onChange={handleMetafieldChange} 
            />
          ))
        }
      </div>
    </div>
  );
};

interface MetafieldItemProps {
  fieldKey: string;
  value: string;
  onChange: (key: string, value: string | number) => void;
}

const MetafieldItem: React.FC<MetafieldItemProps> = ({ fieldKey, value, onChange }) => {
  const getTooltipText = (key: string) => {
    switch(key) {
      case 'auto_preproduct_preorder': return 'General pre-order status';
      case 'auto_preproduct_preorder_launch': return 'Future launch date pre-order';
      case 'auto_preproduct_preorder_specialorder': return 'Special order status';
      case 'auto_preproduct_preorder_backorder': return 'Currently in backorder';
      case 'auto_preproduct_preorder_notifyme': return 'Long-term backorder status (4+ weeks)';
      case 'auto_preproduct_preorder_discontinued': return 'Discontinued by manufacturer';
      case 'auto_preproduct_disablebutton': return 'Disables the purchase button';
      default: return 'Metafield property';
    }
  };
  
  return (
    <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-md border border-border hover:bg-white/90 transition-colors">
      <div className="flex items-center gap-2">
        <Label htmlFor={`variant-${fieldKey}`} className="text-sm font-medium">
          {fieldKey.replace('auto_', '').replace(/_/g, ' ')}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right">
              {getTooltipText(fieldKey)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select 
        value={value}
        onValueChange={(newValue) => onChange(fieldKey, newValue)}
      >
        <SelectTrigger id={`variant-${fieldKey}`} className="w-28 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes" className="text-green-600 font-medium">Yes</SelectItem>
          <SelectItem value="no" className="text-red-600 font-medium">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MetafieldsTab;
