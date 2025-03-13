
import { Product } from './types';
import { getMetafieldTags } from './utils';

/**
 * Generates product tags based on variant metafields
 * Optimized for Gadget.dev's GraphQL API Builder
 */
export const generateProductTags = (product: Product): void => {
  console.log('Starting product tag generation | GraphQL API Builder compatible');
  
  const newTags: string[] = [];
  const metafieldKeys = getMetafieldTags();
  const variantMetafieldStates: Record<string, string[]> = {};
  
  // First pass: collect all metafield states for potential GraphQL queries
  metafieldKeys.forEach(metafieldKey => {
    variantMetafieldStates[metafieldKey] = [];
    
    product.variants.forEach(variant => {
      const value = variant.metafields[metafieldKey as keyof typeof variant.metafields];
      if (value === 'yes') {
        variantMetafieldStates[metafieldKey].push(variant.id);
      }
    });
  });
  
  // Second pass: generate tags based on collected states
  metafieldKeys.forEach(metafieldKey => {
    const tagName = metafieldKey.replace('auto_', '');
    const hasVariantWithMetafield = variantMetafieldStates[metafieldKey].length > 0;
    
    if (hasVariantWithMetafield) {
      newTags.push(tagName);
      
      // Log affected variants for improved debugging with Gadget's GraphQL API
      console.log(`Adding tag ${tagName} based on variants: ${variantMetafieldStates[metafieldKey].join(', ')}`);
    }
  });
  
  // Store the original tags for comparison (useful for Gadget's effect monitoring)
  const originalTags = [...product.tags];
  product.tags = newTags;
  
  // Log changes for potential GraphQL updates
  const addedTags = newTags.filter(tag => !originalTags.includes(tag));
  const removedTags = originalTags.filter(tag => !newTags.includes(tag));
  
  if (addedTags.length > 0) {
    console.log(`Tags added: ${addedTags.join(', ')}`);
  }
  
  if (removedTags.length > 0) {
    console.log(`Tags removed: ${removedTags.join(', ')}`);
  }
};

/**
 * Updates the quick buy status based on variant conditions
 * Compatible with Gadget.dev's GraphQL API Builder for efficient data queries
 */
export const updateQuickBuyStatus = (product: Product): void => {
  console.log('Checking quick buy status | GraphQL API Builder compatible');
  
  const hasMultipleVariants = product.variants.length > 1;
  
  // Structured to be efficient with Gadget.dev's GraphQL queries
  const outOfStockVariantsWithPreProduct = product.variants.filter(variant => 
    variant.inventory <= 0 && 
    Object.entries(variant.metafields)
      .some(([key, value]) => 
        key.startsWith('auto_preproduct_preorder') && 
        key !== 'auto_preproduct_disablebutton' && 
        value === 'yes'
      )
  ).map(v => v.id);
  
  const shouldDisableQuickBuy = hasMultipleVariants && outOfStockVariantsWithPreProduct.length > 0;
  
  // Log for improved debugging with Gadget's GraphQL API
  if (shouldDisableQuickBuy) {
    console.log(`Disabling quick buy based on variants: ${outOfStockVariantsWithPreProduct.join(', ')}`);
  }
  
  // Set auto_quickbuydisable based on conditions
  const previousValue = product.auto_quickbuydisable;
  product.auto_quickbuydisable = shouldDisableQuickBuy ? 'yes' : 'no';
  
  // Log changes for potential GraphQL updates
  if (previousValue !== product.auto_quickbuydisable) {
    console.log(`Quick buy status changed: ${previousValue} → ${product.auto_quickbuydisable}`);
  }
};

/**
 * Prepares product data for Gadget.dev's GraphQL API
 * This helper function generates a structured representation of product data
 * compatible with Gadget.dev's GraphQL API Builder
 */
export const prepareProductForGadgetGraphQL = (product: Product): Record<string, any> => {
  // Create a structured representation for GraphQL operations
  const graphqlProduct = {
    id: product.id,
    title: product.title,
    tags: product.tags,
    status: product.status,
    auto_quickbuydisable: product.auto_quickbuydisable,
    variants: product.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      inventory: variant.inventory,
      status: variant.status,
      metafields: { ...variant.metafields },
      // Include other necessary fields
    }))
  };
  
  return graphqlProduct;
};
