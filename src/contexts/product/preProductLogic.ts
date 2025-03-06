
import { Product, ProductVariant, DiscontinuedValue } from './types';
import { isDiscontinued, getMetafieldTags } from './utils';
import { toast } from '@/components/ui/use-toast';

export const applyPreProductLogic = (currentProduct: Product, setProduct: React.Dispatch<React.SetStateAction<Product>>, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setIsProcessing(true);
  
  setTimeout(() => {
    const updatedProduct = {...currentProduct};
    
    // Ensure all variants have correct default values for metafields
    updatedProduct.variants = updatedProduct.variants.map(variant => {
      return processVariantUpdate(variant);
    });
    
    // Apply product-level logic after processing all variants
    processProductUpdate(updatedProduct);
    
    setProduct(updatedProduct);
    setIsProcessing(false);
    
    toast({
      title: "PreProduct Logic Applied",
      description: `Updated product with ${updatedProduct.tags.length} tags and processed ${updatedProduct.variants.length} variants.`,
    });
  }, 1000);
};

/**
 * Processes a variant update according to the defined business logic
 */
const processVariantUpdate = (variant: ProductVariant): ProductVariant => {
  const updatedVariant = {...variant};
  const metafields = {...updatedVariant.metafields};
  
  // Step 1: Handle discontinued and inventory conditions first (highest priority)
  if ((metafields['custom.discontinued'] === 'Delisted' || 
       metafields['custom.discontinued'] === 'By Manufacturer') && 
      updatedVariant.inventory <= 0) {
    // Reset all preproduct metafields to "no" first
    resetVariantPreProductMetafields(metafields);
    
    // Set discontinued metafield to "yes" if it's "By Manufacturer"
    if (metafields['custom.discontinued'] === 'By Manufacturer') {
      metafields.auto_preproduct_preorder_discontinued = 'yes';
    }
    
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
const resetVariantPreProductMetafields = (metafields: ProductVariant['metafields']): void => {
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
const applyPrioritizedMetafieldLogic = (variant: ProductVariant, metafields: ProductVariant['metafields']): void => {
  // We need to ensure TypeScript treats discontinuedValue correctly
  // Fix by explicitly casting to DiscontinuedValue type
  const discontinuedValue = metafields['custom.discontinued'] as DiscontinuedValue;
  
  // Priority 1: Check for discontinued by manufacturer
  // Use type-safe comparison
  if (discontinuedValue === 'By Manufacturer') {
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
      discontinuedValue !== 'By Manufacturer' &&
      variant.backorderWeeks >= 4) {
    metafields.auto_preproduct_preorder_notifyme = 'yes';
    return;
  }
  
  // Priority 4: Check for special order conditions
  // Must be out of stock (inventory <= 0) and have min qty of 1
  if (variant.inventory <= 0 && 
      discontinuedValue !== 'By Manufacturer' &&
      metafields['custom.ordering_min_qty'] === 1) {
    metafields.auto_preproduct_preorder_specialorder = 'yes';
    return;
  }
  
  // Priority 5: Check for backorder conditions
  if (variant.inventory <= 0 && 
      discontinuedValue !== 'By Manufacturer' && 
      discontinuedValue !== 'Delisted') {
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

/**
 * Processes product-level updates after all variants have been processed
 */
const processProductUpdate = (product: Product): void => {
  // Generate product tags based on variant metafields
  generateProductTags(product);
  
  // Update Quick Buy status based on variant conditions
  updateQuickBuyStatus(product);
};

/**
 * Generates product tags based on variant metafields
 */
const generateProductTags = (product: Product): void => {
  const newTags: string[] = [];
  const metafieldKeys = getMetafieldTags();
  
  metafieldKeys.forEach(metafieldKey => {
    const tagName = metafieldKey.replace('auto_', '');
    const hasVariantWithMetafield = product.variants.some(variant => 
      variant.metafields[metafieldKey as keyof typeof variant.metafields] === 'yes'
    );
    
    if (hasVariantWithMetafield) {
      newTags.push(tagName);
    }
  });
  
  product.tags = newTags;
};

/**
 * Updates the quick buy status based on variant conditions
 * Note: This just sets up the tag for the PreProduct app to use later.
 * The actual implementation of disabling buy buttons, bypassing quick buy,
 * setting inventory policy, etc. is handled by the PreProduct app.
 */
const updateQuickBuyStatus = (product: Product): void => {
  const hasMultipleVariants = product.variants.length > 1;
  
  // Check if any out-of-stock variant has any preproduct metafield set to "yes"
  const hasOutOfStockVariantWithPreProduct = product.variants.some(variant => 
    variant.inventory <= 0 && 
    Object.entries(variant.metafields)
      .some(([key, value]) => 
        key.startsWith('auto_preproduct_preorder') && 
        key !== 'auto_preproduct_disablebutton' && 
        value === 'yes'
      )
  );
  
  // Set auto_quickbuydisable to "yes" if:
  // 1. The product has multiple variants AND
  // 2. At least one variant is out of stock AND has a preproduct metafield set to "yes"
  product.auto_quickbuydisable = (hasMultipleVariants && hasOutOfStockVariantWithPreProduct) 
    ? 'yes' 
    : 'no';
};
