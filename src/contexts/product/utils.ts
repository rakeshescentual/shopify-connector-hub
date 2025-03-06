
import { ProductVariant, DiscontinuedValue } from './types';
import { toast } from '@/components/ui/use-toast';

/**
 * Checks if a variant is discontinued based on the discontinued value
 */
export const isDiscontinued = (discontinuedValue: DiscontinuedValue): boolean => {
  return discontinuedValue === 'By Manufacturer' || discontinuedValue === 'Delisted';
};

/**
 * Creates a new variant with default values
 */
export const createNewVariant = (variantCount: number): ProductVariant => {
  const uniqueId = `variant${variantCount + 1}_${Date.now().toString(36)}`;
  
  return {
    id: uniqueId,
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

/**
 * Validates a variant to ensure business rules are followed
 */
export const validateVariant = (variant: ProductVariant): boolean => {
  if (!variant) {
    toast({
      title: "Validation Error",
      description: "Cannot validate null or undefined variant",
      variant: "destructive"
    });
    return false;
  }
  
  // Validate variant has required fields
  if (!variant.id || !variant.title) {
    toast({
      title: "Validation Error",
      description: "Variant must have an ID and title",
      variant: "destructive"
    });
    return false;
  }
  
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
  
  // Validate ordering_min_qty is at least 1
  if (variant.metafields['custom.ordering_min_qty'] < 1) {
    toast({
      title: "Validation Error", 
      description: "Minimum order quantity must be at least 1",
      variant: "destructive"
    });
    return false;
  }
  
  return true;
};

/**
 * Returns a list of metafield tags
 */
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

/**
 * Validates a date string and returns true if it's valid and in the future
 */
export const isValidFutureDate = (dateString: string | null): boolean => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if date is valid
    if (isNaN(date.getTime())) return false;
    
    // Check if date is in the future
    return date > now;
  } catch (error) {
    return false;
  }
};
