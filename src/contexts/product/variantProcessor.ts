
import { ProductVariant, DiscontinuedValue } from './types';
import { isDiscontinued } from './utils';

/**
 * Processes a variant update according to the defined business logic
 */
export const processVariant = (variant: ProductVariant): ProductVariant => {
  const updatedVariant = {...variant};
  const metafields = {...updatedVariant.metafields};
  
  // Step 1: Handle discontinued and inventory conditions first (highest priority)
  if (isDiscontinued(metafields['custom.discontinued']) && updatedVariant.inventory <= 0) {
    // Reset all preproduct metafields to "no" first
    resetVariantPreProductMetafields(metafields);
    
    // Set discontinued metafield to "yes" if it's "By Manufacturer" or "Delisted"
    metafields.auto_preproduct_preorder_discontinued = 'yes';
    
    // Set the disable button to "yes" for both delisted and by manufacturer cases
    metafields.auto_preproduct_disablebutton = 'yes';
    
    updatedVariant.metafields = metafields;
    return updatedVariant;
  }
  
  // Step 2: For non-discontinued variants, reset and apply standard logic
  metafields.auto_preproduct_disablebutton = 'no';
  
  // Ensure default values for required metafields
  if (!metafields['custom.discontinued']) {
    metafields['custom.discontinued'] = 'No';
  }
  
  if (metafields['custom.ordering_min_qty'] === undefined || 
      metafields['custom.ordering_min_qty'] === null) {
    metafields['custom.ordering_min_qty'] = 1;
  }
  
  // Reset all preproduct metafields before applying logic
  resetVariantPreProductMetafields(metafields);
  
  // Step 3: Apply metafield conditions based on priority
  applyPrioritizedMetafieldLogic(updatedVariant, metafields);
  
  updatedVariant.metafields = metafields;
  return updatedVariant;
};

/**
 * Resets all preproduct metafields to "no"
 */
export const resetVariantPreProductMetafields = (metafields: ProductVariant['metafields']): void => {
  // Reset all preproduct metafields to "no"
  Object.keys(metafields).forEach(key => {
    if (key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton') {
      (metafields as any)[key] = 'no';
    }
  });
};

/**
 * Applies metafield logic based on priority
 */
export const applyPrioritizedMetafieldLogic = (variant: ProductVariant, metafields: ProductVariant['metafields']): void => {
  // Create a local copy of the discontinued value with the correct type
  const discontinuedValue = metafields['custom.discontinued'] as DiscontinuedValue;
  
  // Priority 1: Check for discontinued by manufacturer or delisted
  if (isDiscontinued(discontinuedValue)) {
    metafields.auto_preproduct_preorder_discontinued = 'yes';
    return; // Exit early as we've set the highest priority metafield
  }
  
  // Priority 2: Check for launch dates (future products)
  if (variant.launchDate) {
    const launchDate = new Date(variant.launchDate);
    const currentDate = new Date();
    
    if (launchDate > currentDate) {
      metafields.auto_preproduct_preorder_launch = 'yes';
      return; // Exit early as we've set the highest priority metafield
    }
  }
  
  // Priority 3: Check for notify me conditions (extended backorder)
  // For notifyme, we reset the 4-week timer if item comes back in stock then goes out again
  // This means we only apply the tag if the current inventory is <= 0 AND backorderWeeks >= 4
  if (variant.inventory <= 0 && 
      variant.backorderWeeks >= 4) {
    metafields.auto_preproduct_preorder_notifyme = 'yes';
    return;
  }
  
  // Priority 4: Check for special order conditions
  // Must be out of stock (inventory <= 0) and have min qty of 1
  if (variant.inventory <= 0 && 
      metafields['custom.ordering_min_qty'] === 1) {
    metafields.auto_preproduct_preorder_specialorder = 'yes';
    return;
  }
  
  // Priority 5: Check for backorder conditions
  // Use the isDiscontinued helper function for checking discontinuation
  if (variant.inventory <= 0 && !isDiscontinued(discontinuedValue)) {
    metafields.auto_preproduct_preorder_backorder = 'yes';
    return;
  }
  
  // Priority 6 (lowest): Apply standard preorder status when no other condition is met,
  // the inventory is zero, and the variant has never had stock before
  if (variant.inventory <= 0 && !variant.hadStockBefore) {
    metafields.auto_preproduct_preorder = 'yes';
    return;
  }
};
