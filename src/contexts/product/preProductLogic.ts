
import { Product, ProductVariant } from './types';
import { isDiscontinued, getMetafieldTags } from './utils';
import { toast } from '@/components/ui/use-toast';

export const applyPreProductLogic = (currentProduct: Product, setProduct: React.Dispatch<React.SetStateAction<Product>>, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setIsProcessing(true);
  
  setTimeout(() => {
    const updatedProduct = {...currentProduct};
    
    // Ensure all variants have correct default values for metafields
    updatedProduct.variants = updatedProduct.variants.map(variant => {
      const updatedVariant = {...variant};
      const metafields = {...updatedVariant.metafields};
      
      // Validate and set defaults for custom.discontinued
      if (!metafields['custom.discontinued']) {
        metafields['custom.discontinued'] = 'No';
      }
      
      // Validate and set defaults for custom.ordering_min_qty
      if (metafields['custom.ordering_min_qty'] === undefined || metafields['custom.ordering_min_qty'] === null) {
        metafields['custom.ordering_min_qty'] = 1;
      }
      
      updatedVariant.metafields = metafields;
      return updatedVariant;
    });
    
    // Step 1: Reset all preproduct metafields
    resetPreProductMetafields(updatedProduct);

    // Step 2: Apply variant-specific logic for each variant independently
    applyVariantLogic(updatedProduct);
    
    // Step 3: Generate product tags based on variant metafields
    generateProductTags(updatedProduct);
    
    // Step 4: Update Quick Buy status based on variant conditions
    updateQuickBuyStatus(updatedProduct);
    
    setProduct(updatedProduct);
    setIsProcessing(false);
    
    toast({
      title: "PreProduct Logic Applied",
      description: `Updated product with ${updatedProduct.tags.length} tags and processed ${updatedProduct.variants.length} variants.`,
    });
  }, 1000);
};

const resetPreProductMetafields = (product: Product): void => {
  product.variants = product.variants.map(variant => {
    const updatedVariant = {...variant};
    const metafields = {...updatedVariant.metafields};
    
    // Reset all preproduct metafields to "no" first
    Object.keys(metafields).forEach(key => {
      if (key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton') {
        (metafields as any)[key] = 'no';
      }
    });
    
    // Also reset the disablebutton metafield to "no"
    metafields.auto_preproduct_disablebutton = 'no';
    
    updatedVariant.metafields = metafields;
    return updatedVariant;
  });
};

const applyVariantLogic = (product: Product): void => {
  product.variants = product.variants.map(variant => {
    const updatedVariant = {...variant};
    const metafields = {...updatedVariant.metafields};
    const discontinuedValue = metafields['custom.discontinued'];
    
    // Check each condition independently for each variant
    
    // Check for discontinued items (highest priority)
    if (isDiscontinued(discontinuedValue) && updatedVariant.inventory <= 0) {
      metafields.auto_preproduct_preorder_discontinued = 'yes';
      // Set auto_preproduct_disablebutton to "yes" for discontinued items with no inventory
      metafields.auto_preproduct_disablebutton = 'yes';
    }
    
    // Check for launch dates
    else if (updatedVariant.launchDate) {
      const launchDate = new Date(updatedVariant.launchDate);
      const currentDate = new Date();
      
      // Only set launch tag if the launch date is in the future
      if (launchDate > currentDate) {
        metafields.auto_preproduct_preorder_launch = 'yes';
      }
    }
    
    // Check for special order conditions
    else if (
      updatedVariant.inventory <= 0 && 
      !isDiscontinued(discontinuedValue) &&
      metafields['custom.ordering_min_qty'] === 1
    ) {
      metafields.auto_preproduct_preorder_specialorder = 'yes';
    }
    
    // Check for notify me conditions (extended backorder)
    // If the variant has been in backorder for 4 or more weeks
    else if (
      updatedVariant.inventory <= 0 && 
      !isDiscontinued(discontinuedValue) &&
      updatedVariant.backorderWeeks >= 4
    ) {
      metafields.auto_preproduct_preorder_notifyme = 'yes';
    }
    
    // Check for backorder conditions
    else if (
      updatedVariant.inventory <= 0 && 
      !isDiscontinued(discontinuedValue)
    ) {
      metafields.auto_preproduct_preorder_backorder = 'yes';
    }
    
    // Apply preproduct_preorder according to refined logic
    // Only if the variant has never had stock before
    else if (
      updatedVariant.inventory <= 0 && 
      !updatedVariant.hadStockBefore
    ) {
      metafields.auto_preproduct_preorder = 'yes';
    }
    
    updatedVariant.metafields = metafields;
    return updatedVariant;
  });
};

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
  // 2. At least one variant is out of stock AND
  // 3. That out-of-stock variant has a preproduct metafield set to "yes"
  product.auto_quickbuydisable = (hasMultipleVariants && hasOutOfStockVariantWithPreProduct) 
    ? 'yes' 
    : 'no';
};
