
import { Product, ProductVariant, DiscontinuedValue } from './types';
import { isDiscontinued, getMetafieldTags } from './utils';
import { toast } from '@/components/ui/use-toast';
import { processVariant } from './variantProcessor';
import { generateProductTags, updateQuickBuyStatus } from './productProcessors';

export const applyPreProductLogic = (currentProduct: Product, setProduct: React.Dispatch<React.SetStateAction<Product>>, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setIsProcessing(true);
  
  setTimeout(() => {
    const updatedProduct = {...currentProduct};
    
    // Ensure all variants have correct default values for metafields
    updatedProduct.variants = updatedProduct.variants.map(variant => {
      return processVariant(variant);
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
 * Processes product-level updates after all variants have been processed
 */
const processProductUpdate = (product: Product): void => {
  // Generate product tags based on variant metafields
  generateProductTags(product);
  
  // Update Quick Buy status based on variant conditions
  updateQuickBuyStatus(product);
};
