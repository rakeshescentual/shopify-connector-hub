
import { ProductVariant, DiscontinuedValue } from './types';
import { toast } from '@/components/ui/use-toast';

export const isDiscontinued = (discontinuedValue: DiscontinuedValue): boolean => {
  return discontinuedValue === 'By Manufacturer' || discontinuedValue === 'Delisted';
};

export const createNewVariant = (variantCount: number): ProductVariant => {
  return {
    id: `variant${variantCount + 1}`,
    title: `New Variant ${variantCount + 1}`,
    inventory: 10,
    hadStockBefore: false,
    launchDate: null,
    metafields: {
      auto_preproduct_preorder: 'no',
      auto_preproduct_preorder_launch: 'no',
      auto_preproduct_preorder_specialorder: 'no',
      auto_preproduct_preorder_backorder: 'no',
      auto_preproduct_preorder_notifyme: 'no',
      auto_preproduct_preorder_discontinued: 'no',
      auto_preproduct_disablebutton: 'no',
      'custom.discontinued': 'No',
      'custom.ordering_min_qty': 1
    },
    backorderWeeks: 0
  };
};

export const validateVariant = (variant: ProductVariant): boolean => {
  // Validate only one preproduct metafield is set to "yes" for this variant
  const preproductMetafields = Object.entries(variant.metafields)
    .filter(([key, value]) => 
      key.startsWith('auto_preproduct_preorder') && 
      key !== 'auto_preproduct_disablebutton' && 
      value === 'yes'
    );
  
  if (preproductMetafields.length > 1) {
    toast({
      title: "Validation Error",
      description: "Only one preproduct metafield can be set to 'yes' per variant at a time. Please fix and try again.",
      variant: "destructive"
    });
    return false;
  }
  
  return true;
};

export const getMetafieldTags = (): string[] => {
  return [
    'auto_preproduct_preorder',
    'auto_preproduct_preorder_launch',
    'auto_preproduct_preorder_specialorder',
    'auto_preproduct_preorder_backorder',
    'auto_preproduct_preorder_notifyme',
    'auto_preproduct_preorder_discontinued'
  ];
};
