
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
      // Validate discontinuted metafield value
      if (!editableVariant.metafields['custom.discontinued']) {
        editableVariant.metafields['custom.discontinued'] = 'No';
      }
      
      // Validate ordering min qty metafield value
      if (editableVariant.metafields['custom.ordering_min_qty'] === undefined || 
          editableVariant.metafields['custom.ordering_min_qty'] === null ||
          editableVariant.metafields['custom.ordering_min_qty'] < 1) {
        editableVariant.metafields['custom.ordering_min_qty'] = 1;
      }
      
      // Validate variant before updating
      if (!validateVariant(editableVariant)) {
        return;
      }
      
      // Check if the variant actually changed
      const originalVariant = product.variants.find(v => v.id === editableVariant.id);
      const hasChanged = JSON.stringify(originalVariant) !== JSON.stringify(editableVariant);
      
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
          v.id === editableVariant.id ? editableVariant : v
        )
      }));
      
      toast({
        title: "Variant Updated",
        description: `Updated variant: ${editableVariant.title}`,
      });
      
      // Automatically apply PreProduct logic after updating a variant
      setTimeout(() => {
        applyPreProductLogicHandler();
      }, 100);
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
    applyPreProductLogic(product, setProduct, setIsProcessing);
  }, [product]);

  const handleVariantChange = useCallback((field: string, value: any) => {
    handleVariantChangeImpl(field, value, editableVariant, setEditableVariant);
  }, [editableVariant]);

  const resetSimulator = useCallback(() => {
    // Ask for confirmation before resetting
    if (window.confirm("Are you sure you want to reset the simulator? All changes will be lost.")) {
      setProduct(initialProduct);
      setSelectedVariantId(initialProduct.variants[0].id);
      setIsProcessing(false);
      setEditableVariant({...initialProduct.variants[0]});
      setShowAdvanced(false);
      
      toast({
        title: "Simulator Reset",
        description: "All changes have been discarded.",
      });
    }
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
