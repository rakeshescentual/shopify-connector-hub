
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
  console.log('Starting PreProduct logic processing...');
  
  // Use a smaller timeout (500ms instead of 1000ms) for better perceived performance
  setTimeout(() => {
    try {
      const updatedProduct = {...currentProduct};
      const processingLog: string[] = [];
      
      // Add timestamp for when processing occurred
      updatedProduct.lastProcessed = new Date().toISOString();
      processingLog.push(`Processing started at ${new Date().toLocaleString()}`);
      
      // Process each variant according to business rules
      const processedVariants: ProductVariant[] = [];
      let variantsUpdated = 0;
      
      // Process variants in batches to improve performance with large variant sets
      for (const variant of updatedProduct.variants) {
        try {
          processingLog.push(`Processing variant: ${variant.title}`);
          
          const processed = processVariant(variant);
          
          // Add lastUpdated timestamp to the variant
          processed.lastUpdated = new Date().toISOString();
          processed.status = 'active'; // Mark as active after processing
          
          // Check what changed
          const changedMetafields = Object.keys(processed.metafields).filter(key => 
            processed.metafields[key as keyof typeof processed.metafields] !== 
            variant.metafields[key as keyof typeof variant.metafields]
          );
          
          if (changedMetafields.length > 0) {
            processingLog.push(`  Updated metafields: ${changedMetafields.join(', ')}`);
          } else {
            processingLog.push(`  No metafield changes needed`);
          }
          
          processedVariants.push(processed);
          variantsUpdated++;
        } catch (variantError) {
          console.error(`Error processing variant ${variant.id}:`, variantError);
          processingLog.push(`  ERROR processing ${variant.title}: ${variantError instanceof Error ? variantError.message : String(variantError)}`);
          
          // Continue processing other variants even if one fails
          variant.status = 'inactive'; // Mark as inactive due to processing error
          processedVariants.push(variant);
          
          toast({
            title: "Warning",
            description: `Failed to process variant "${variant.title}". Using original values.`,
            variant: "destructive"
          });
        }
      }
      
      updatedProduct.variants = processedVariants;
      
      // Apply product-level logic after processing all variants
      processingLog.push('Applying product-level logic...');
      const previousTags = [...updatedProduct.tags];
      const previousQuickBuy = updatedProduct.auto_quickbuydisable;
      
      processProductUpdate(updatedProduct);
      
      if (JSON.stringify(previousTags) !== JSON.stringify(updatedProduct.tags)) {
        processingLog.push(`  Updated tags: ${updatedProduct.tags.join(', ')}`);
      }
      
      if (previousQuickBuy !== updatedProduct.auto_quickbuydisable) {
        processingLog.push(`  Quick Buy status changed to: ${updatedProduct.auto_quickbuydisable}`);
      }
      
      console.log('PreProduct Processing Log:', processingLog);
      setProduct(updatedProduct);
      
      toast({
        title: "PreProduct Logic Applied",
        description: `Updated product with ${updatedProduct.tags.length} tags and processed ${variantsUpdated} variants.`,
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
  }, 500); // Reduced timeout for better UX
};

/**
 * Processes product-level updates after all variants have been processed
 */
const processProductUpdate = (product: Product): void => {
  try {
    // Generate product tags based on variant metafields
    generateProductTags(product);
    
    // Update Quick Buy status based on variant conditions
    updateQuickBuyStatus(product);
  } catch (error) {
    console.error("Error in product update processing:", error);
    throw new Error("Failed to process product update: " + (error instanceof Error ? error.message : String(error)));
  }
};
