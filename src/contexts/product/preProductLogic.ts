
import { Product, ProductVariant } from './types';
import { toast } from '@/components/ui/use-toast';
import { processVariant } from './variantProcessor';
import { generateProductTags, updateQuickBuyStatus } from './productProcessors';

/**
 * Applies pre-product logic to determine product and variant states
 * based on inventory, metadata, and business rules
 */
export const applyPreProductLogic = (
  currentProduct: Product, 
  setProduct: React.Dispatch<React.SetStateAction<Product>>, 
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setIsProcessing(true);
  
  setTimeout(() => {
    try {
      const updatedProduct = {...currentProduct};
      
      // Process each variant according to business rules
      updatedProduct.variants = updatedProduct.variants.map(variant => {
        return processVariant(variant);
      });
      
      // Apply product-level logic after processing all variants
      processProductUpdate(updatedProduct);
      
      setProduct(updatedProduct);
      
      toast({
        title: "PreProduct Logic Applied",
        description: `Updated product with ${updatedProduct.tags.length} tags and processed ${updatedProduct.variants.length} variants.`,
      });
    } catch (error) {
      console.error("Error applying PreProduct logic:", error);
      toast({
        title: "Error",
        description: "Failed to apply PreProduct logic. See console for details.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
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
