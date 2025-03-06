
import React, { createContext, useState, useContext, ReactNode } from 'react';
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

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  React.useEffect(() => {
    setEditableVariant({...selectedVariant});
  }, [selectedVariantId]);

  const addVariant = () => {
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
  };

  const updateVariant = () => {
    if (!editableVariant) return;
    
    // Validate discontinuted metafield value
    if (!editableVariant.metafields['custom.discontinued']) {
      editableVariant.metafields['custom.discontinued'] = 'No';
    }
    
    // Validate ordering min qty metafield value
    if (editableVariant.metafields['custom.ordering_min_qty'] === undefined || 
        editableVariant.metafields['custom.ordering_min_qty'] === null) {
      editableVariant.metafields['custom.ordering_min_qty'] = 1;
    }
    
    if (!validateVariant(editableVariant)) {
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
    
    applyPreProductLogicHandler();
  };

  const applyPreProductLogicHandler = () => {
    applyPreProductLogic(product, setProduct, setIsProcessing);
  };

  const handleVariantChange = (field: string, value: any) => {
    handleVariantChangeImpl(field, value, editableVariant, setEditableVariant);
  };

  const value = {
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
    handleVariantChange
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Re-export types for ease of use
export type { Product, ProductVariant, MetafieldKey } from './product/types';
