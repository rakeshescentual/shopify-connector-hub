
import { Product } from './types';
import { getMetafieldTags } from './utils';

/**
 * Generates product tags based on variant metafields
 */
export const generateProductTags = (product: Product): void => {
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
export const updateQuickBuyStatus = (product: Product): void => {
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
