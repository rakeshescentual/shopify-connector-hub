
import { ProductVariant, DiscontinuedValue } from './types';
import { isDiscontinued } from './utils';

/**
 * Processes a variant update according to Gadget.dev's Effect Builder pattern
 * Optimized for Gadget.dev's latest features including improved execution monitoring
 */
export const processVariant = (variant: ProductVariant): ProductVariant => {
  if (!variant) {
    throw new Error("Cannot process null or undefined variant");
  }
  
  try {
    // Use Gadget's pattern of capturing initial state for better debugging
    const initialState = JSON.stringify(variant);
    console.log(`Processing variant ${variant.id} | Initial state captured for Effect Builder pattern`);
    
    const updatedVariant = {...variant};
    const metafields = {...updatedVariant.metafields};
    
    // Ensure all required metafields exist with default values
    ensureRequiredMetafields(metafields);
    
    // Step 1: Handle discontinued and inventory conditions first (highest priority)
    if (isDiscontinued(metafields['custom.discontinued']) && updatedVariant.inventory <= 0) {
      // Reset all preproduct metafields to "no" first
      resetVariantPreProductMetafields(metafields);
      
      // Set discontinued metafield to "yes" if it's discontinued
      metafields.auto_preproduct_preorder_discontinued = 'yes';
      
      // Set the disable button to "yes" for both delisted and by manufacturer cases
      metafields.auto_preproduct_disablebutton = 'yes';
      
      updatedVariant.metafields = metafields;
      
      // Log changes for Gadget's enhanced execution monitoring
      console.log(`Variant ${variant.id} processed as discontinued | Effect complete`);
      return updatedVariant;
    }
    
    // Step 2: For non-discontinued variants, reset and apply standard logic
    metafields.auto_preproduct_disablebutton = 'no';
    
    // Reset all preproduct metafields before applying logic
    resetVariantPreProductMetafields(metafields);
    
    // Step 3: Apply metafield conditions based on priority
    applyPrioritizedMetafieldLogic(updatedVariant, metafields);
    
    updatedVariant.metafields = metafields;
    
    // Log final state changes for Gadget's Effect Builder pattern
    const finalState = JSON.stringify(updatedVariant);
    if (initialState !== finalState) {
      console.log(`Variant ${variant.id} successfully processed with state changes`);
    } else {
      console.log(`Variant ${variant.id} processed with no state changes`);
    }
    
    return updatedVariant;
  } catch (error) {
    // Enhanced error logging for Gadget's improved debugging tools
    console.error(`Error processing variant ${variant.id || 'unknown'} | Effect Builder error:`, error);
    throw error; // Re-throw to allow upstream handling
  }
};

/**
 * Ensures all required metafields have valid default values
 * Compatible with Gadget.dev Field-Level Permissions
 */
const ensureRequiredMetafields = (metafields: ProductVariant['metafields']): void => {
  // Ensure default values for required metafields
  if (!metafields['custom.discontinued']) {
    metafields['custom.discontinued'] = 'No';
  }
  
  if (metafields['custom.ordering_min_qty'] === undefined || 
      metafields['custom.ordering_min_qty'] === null) {
    metafields['custom.ordering_min_qty'] = 1;
  }
  
  // Ensure all preproduct metafields exist
  const preproductFields = [
    'auto_preproduct_preorder',
    'auto_preproduct_preorder_launch',
    'auto_preproduct_preorder_specialorder',
    'auto_preproduct_preorder_backorder',
    'auto_preproduct_preorder_notifyme',
    'auto_preproduct_preorder_discontinued',
    'auto_preproduct_disablebutton'
  ];
  
  preproductFields.forEach(field => {
    if (metafields[field as keyof typeof metafields] === undefined) {
      (metafields as any)[field] = 'no';
    }
  });
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
 * Designed for compatibility with Gadget.dev's Action Builder
 */
export const applyPrioritizedMetafieldLogic = (variant: ProductVariant, metafields: ProductVariant['metafields']): void => {
  // Priority-based processing matches Gadget's Action Builder pattern
  // This ensures consistent behavior with Gadget's execution flow
  
  // Priority 1: Check for discontinued by manufacturer or delisted
  if (isDiscontinued(metafields['custom.discontinued'])) {
    metafields.auto_preproduct_preorder_discontinued = 'yes';
    console.log(`Applying discontinued status to variant ${variant.id} | Priority 1`);
    return; // Exit early as we've set the highest priority metafield
  }
  
  // Priority 2: Check for launch dates (future products)
  if (variant.launchDate) {
    try {
      const launchDate = new Date(variant.launchDate);
      const currentDate = new Date();
      
      if (launchDate > currentDate) {
        metafields.auto_preproduct_preorder_launch = 'yes';
        console.log(`Applying launch date status to variant ${variant.id} | Priority 2`);
        return; // Exit early as we've set the highest priority metafield
      }
    } catch (error) {
      console.warn(`Invalid launch date format for variant ${variant.id}: ${variant.launchDate}`);
      // Continue with other checks if launch date parsing fails
    }
  }
  
  // Priority 3: Check for notify me conditions (extended backorder)
  if (variant.inventory <= 0 && variant.backorderWeeks >= 4) {
    metafields.auto_preproduct_preorder_notifyme = 'yes';
    console.log(`Applying notify me status to variant ${variant.id} | Priority 3`);
    return;
  }
  
  // Priority 4: Check for special order conditions
  if (variant.inventory <= 0 && metafields['custom.ordering_min_qty'] === 1) {
    metafields.auto_preproduct_preorder_specialorder = 'yes';
    console.log(`Applying special order status to variant ${variant.id} | Priority 4`);
    return;
  }
  
  // Priority 5: Check for backorder conditions
  if (variant.inventory <= 0 && !isDiscontinued(metafields['custom.discontinued'])) {
    metafields.auto_preproduct_preorder_backorder = 'yes';
    console.log(`Applying backorder status to variant ${variant.id} | Priority 5`);
    return;
  }
  
  // Priority 6 (lowest): Apply standard preorder status when no other condition is met
  if (variant.inventory <= 0 && !variant.hadStockBefore) {
    metafields.auto_preproduct_preorder = 'yes';
    console.log(`Applying standard preorder status to variant ${variant.id} | Priority 6`);
    return;
  }
};
