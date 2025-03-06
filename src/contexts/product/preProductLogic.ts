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
      let variantsWithErrors = 0;
      
      // Process variants in batches to improve performance with large variant sets
      for (const variant of updatedProduct.variants) {
        try {
          processingLog.push(`Processing variant: ${variant.title}`);
          
          const processed = processVariant(variant);
          
          // Add lastUpdated timestamp to the variant
          processed.lastUpdated = new Date().toISOString();
          processed.status = 'active'; // Mark as active after processing
          
          // Track processing history
          processed.processingHistory = processed.processingHistory || [];
          processed.processingHistory.push(`Processed at ${new Date().toLocaleTimeString()}`);
          
          // Keep history to the last 10 entries
          if (processed.processingHistory.length > 10) {
            processed.processingHistory = processed.processingHistory.slice(-10);
          }
          
          // Check what changed
          const changedMetafields = Object.keys(processed.metafields).filter(key => 
            processed.metafields[key as keyof typeof processed.metafields] !== 
            variant.metafields[key as keyof typeof variant.metafields]
          );
          
          if (changedMetafields.length > 0) {
            const changeLog = `  Updated metafields: ${changedMetafields.join(', ')}`;
            processingLog.push(changeLog);
            
            // Add more detailed status message
            let statusMessage = "Processing complete: ";
            if (changedMetafields.some(field => field.includes('discontinued'))) {
              statusMessage += "Discontinued status applied. ";
            } else if (changedMetafields.some(field => field.includes('launch'))) {
              statusMessage += "Launch pre-order status applied. ";
            } else if (changedMetafields.some(field => field.includes('notifyme'))) {
              statusMessage += "Notify Me status applied due to extended backorder. ";
            } else if (changedMetafields.some(field => field.includes('specialorder'))) {
              statusMessage += "Special Order status applied. ";
            } else if (changedMetafields.some(field => field.includes('backorder'))) {
              statusMessage += "Backorder status applied. ";
            } else if (changedMetafields.some(field => field === 'auto_preproduct_preorder')) {
              statusMessage += "Pre-Order status applied. ";
            }
            
            processed.statusMessage = statusMessage;
          } else {
            processingLog.push(`  No metafield changes needed`);
            processed.statusMessage = "Processing complete: No changes needed";
          }
          
          processedVariants.push(processed);
          variantsUpdated++;
        } catch (variantError) {
          console.error(`Error processing variant ${variant.id}:`, variantError);
          const errorMessage = `ERROR processing ${variant.title}: ${variantError instanceof Error ? variantError.message : String(variantError)}`;
          processingLog.push(`  ${errorMessage}`);
          
          // Continue processing other variants even if one fails
          variant.status = 'error'; // Mark as error due to processing error
          variant.statusMessage = errorMessage;
          variant.lastUpdated = new Date().toISOString();
          
          // Track the error in processing history
          variant.processingHistory = variant.processingHistory || [];
          variant.processingHistory.push(`Error at ${new Date().toLocaleTimeString()}: ${variantError instanceof Error ? variantError.message : String(variantError)}`);
          
          // Keep history to the last 10 entries
          if (variant.processingHistory.length > 10) {
            variant.processingHistory = variant.processingHistory.slice(-10);
          }
          
          processedVariants.push(variant);
          variantsWithErrors++;
          
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
      
      // Store the processing log in the product
      updatedProduct.processingLog = processingLog;
      
      console.log('PreProduct Processing Log:', processingLog);
      setProduct(updatedProduct);
      
      // Show appropriate toast based on results
      if (variantsWithErrors > 0) {
        toast({
          title: "PreProduct Logic Applied With Warnings",
          description: `Updated ${variantsUpdated - variantsWithErrors} variants successfully. ${variantsWithErrors} variants had errors.`,
          variant: "warning"
        });
      } else {
        toast({
          title: "PreProduct Logic Applied",
          description: `Updated product with ${updatedProduct.tags.length} tags and processed ${variantsUpdated} variants.`,
        });
      }
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
