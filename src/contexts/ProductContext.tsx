
import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Product, ProductVariant, ProductContextType } from './product/types';
import { initialProduct } from './product/initialState';
import { createNewVariant, validateVariant } from './product/utils';
import { applyPreProductLogic } from './product/preProductLogic';
import { handleVariantChange as handleVariantChangeImpl } from './product/variantHandlers';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editableVariant, setEditableVariant] = useState<ProductVariant | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Memoize selectedVariant to prevent unnecessary re-renders
  const selectedVariant = useMemo(() => 
    product.variants.find(v => v.id === selectedVariantId) || product.variants[0],
    [product.variants, selectedVariantId]
  );

  // Initialize editable variant when selected variant changes
  React.useEffect(() => {
    if (selectedVariant) {
      setEditableVariant({...selectedVariant});
    }
  }, [selectedVariantId, selectedVariant]);

  const addVariant = useCallback(() => {
    try {
      const newVariant = createNewVariant(product.variants.length);
      newVariant.status = 'pending'; // Mark as pending until processed
      newVariant.lastUpdated = new Date().toISOString(); // Add creation timestamp
      
      setProduct(prev => ({
        ...prev,
        variants: [...prev.variants, newVariant]
      }));
      
      setSelectedVariantId(newVariant.id);
      toast({
        title: "Variant Added",
        description: `Added new variant: ${newVariant.title}`,
      });
    } catch (error) {
      console.error("Error adding variant:", error);
      toast({
        title: "Error",
        description: "Failed to add variant. See console for details.",
        variant: "destructive"
      });
    }
  }, [product.variants.length]);

  const updateVariant = useCallback(() => {
    if (!editableVariant) {
      toast({
        title: "Error",
        description: "No variant selected for update.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Deep copy to avoid mutations
      const variantToUpdate = JSON.parse(JSON.stringify(editableVariant));
      
      // Validate discontinued metafield value
      if (!variantToUpdate.metafields['custom.discontinued']) {
        variantToUpdate.metafields['custom.discontinued'] = 'No';
      }
      
      // Validate ordering min qty metafield value
      if (variantToUpdate.metafields['custom.ordering_min_qty'] === undefined || 
          variantToUpdate.metafields['custom.ordering_min_qty'] === null ||
          variantToUpdate.metafields['custom.ordering_min_qty'] < 1) {
        variantToUpdate.metafields['custom.ordering_min_qty'] = 1;
      }
      
      // Validate variant before updating
      if (!validateVariant(variantToUpdate)) {
        return;
      }
      
      // Add lastUpdated timestamp and set status to pending
      variantToUpdate.lastUpdated = new Date().toISOString();
      variantToUpdate.status = 'pending';
      
      // Check if the variant actually changed
      const originalVariant = product.variants.find(v => v.id === variantToUpdate.id);
      const hasChanged = JSON.stringify(originalVariant) !== JSON.stringify(variantToUpdate);
      
      if (!hasChanged) {
        toast({
          title: "No Changes",
          description: "No changes were made to the variant.",
        });
        return;
      }
      
      setProduct(prev => ({
        ...prev,
        variants: prev.variants.map(v => 
          v.id === variantToUpdate.id ? variantToUpdate : v
        )
      }));
      
      toast({
        title: "Variant Updated",
        description: `Updated variant: ${variantToUpdate.title}`,
      });
      
      // Ask user if they want to automatically apply PreProduct logic
      const shouldApplyLogic = window.confirm("Do you want to apply PreProduct logic to update product status?");
      if (shouldApplyLogic) {
        setTimeout(() => {
          applyPreProductLogicHandler();
        }, 100);
      }
    } catch (error) {
      console.error("Error updating variant:", error);
      toast({
        title: "Error",
        description: "Failed to update variant. See console for details.",
        variant: "destructive"
      });
    }
  }, [editableVariant, product.variants]);

  const applyPreProductLogicHandler = useCallback(() => {
    if (product.variants.length === 0) {
      toast({
        title: "Warning",
        description: "Cannot apply PreProduct logic: No variants exist.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if any variants are pending
    const hasPendingVariants = product.variants.some(v => v.status === 'pending');
    if (hasPendingVariants) {
      const proceed = window.confirm("Some variants are still pending. Processing may overwrite your recent changes. Continue?");
      if (!proceed) return;
    }
    
    applyPreProductLogic(product, setProduct, setIsProcessing);
  }, [product]);

  const handleVariantChange = useCallback((field: string, value: any) => {
    handleVariantChangeImpl(field, value, editableVariant, setEditableVariant);
  }, [editableVariant]);

  const resetSimulator = useCallback(() => {
    setProduct(initialProduct);
    setSelectedVariantId(initialProduct.variants[0].id);
    setIsProcessing(false);
    setEditableVariant({...initialProduct.variants[0]});
    setShowAdvanced(false);
    
    toast({
      title: "Simulator Reset",
      description: "All changes have been discarded.",
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    product,
    setProduct,
    selectedVariantId,
    setSelectedVariantId,
    selectedVariant,
    isProcessing,
    setIsProcessing,
    editableVariant,
    setEditableVariant,
    showAdvanced,
    setShowAdvanced,
    addVariant,
    applyPreProductLogic: applyPreProductLogicHandler,
    updateVariant,
    handleVariantChange,
    resetSimulator
  }), [
    product, 
    selectedVariantId, 
    selectedVariant, 
    isProcessing, 
    editableVariant, 
    showAdvanced, 
    addVariant, 
    applyPreProductLogicHandler, 
    updateVariant, 
    handleVariantChange,
    resetSimulator
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Re-export types for ease of use
export type { Product, ProductVariant, MetafieldKey } from './product/types';
