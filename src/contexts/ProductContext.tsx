
import React, { createContext, useState, useContext } from 'react';
import { Product, ProductVariant, ProductContextType } from './product/types';
import { initialProduct } from './product/initialState';
import { generateProductTags, updateQuickBuyStatus } from './product/productProcessors';
import { validateVariant, createNewVariant } from './product/utils';
import { toast } from '@/components/ui/use-toast';

// Create the context with default values
const ProductContext = createContext<ProductContextType>({
  product: initialProduct,
  setProduct: () => {},
  selectedVariantId: '',
  setSelectedVariantId: () => {},
  selectedVariant: initialProduct.variants[0],
  isProcessing: false,
  setIsProcessing: () => {},
  editableVariant: null,
  setEditableVariant: () => {},
  showAdvanced: false,
  setShowAdvanced: () => {},
  addVariant: () => {},
  applyPreProductLogic: () => {},
  updateVariant: () => {},
  handleVariantChange: () => {},
  resetSimulator: () => {}
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(initialProduct.variants[0].id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [editableVariant, setEditableVariant] = useState<ProductVariant | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  
  const addVariant = () => {
    const newVariant = createNewVariant(product.variants.length);
    setProduct(prevProduct => ({
      ...prevProduct,
      variants: [...prevProduct.variants, newVariant]
    }));
    setSelectedVariantId(newVariant.id);
    toast({
      title: "New variant created",
      description: `Added ${newVariant.title} to product`
    });
  };
  
  const applyPreProductLogic = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const updatedProduct = { ...product };
        
        // Apply product processors
        generateProductTags(updatedProduct);
        updateQuickBuyStatus(updatedProduct);
        
        setProduct(updatedProduct);
        toast({
          title: "PreProduct Logic Applied",
          description: "Product tags and status updated successfully"
        });
      } catch (error) {
        console.error("Error applying PreProduct logic:", error);
        toast({
          title: "Processing Error",
          description: "An error occurred while applying PreProduct logic",
          variant: "destructive"
        });
      }
      setIsProcessing(false);
    }, 500);
  };
  
  const updateVariant = () => {
    if (!editableVariant) {
      toast({
        title: "No variant selected",
        description: "Please select a variant to update"
      });
      return;
    }
    
    if (!validateVariant(editableVariant)) {
      return;
    }
    
    setProduct(prevProduct => ({
      ...prevProduct,
      variants: prevProduct.variants.map(v => 
        v.id === editableVariant.id ? editableVariant : v
      )
    }));
    
    setEditableVariant(null);
    toast({
      title: "Variant updated",
      description: `${editableVariant.title} has been updated`
    });
  };
  
  const handleVariantChange = (field: string, value: any) => {
    if (!editableVariant) return;
    
    if (field.startsWith('metafields.')) {
      const metafieldKey = field.split('.')[1];
      setEditableVariant({
        ...editableVariant,
        metafields: {
          ...editableVariant.metafields,
          [metafieldKey]: value
        }
      });
    } else {
      setEditableVariant({
        ...editableVariant,
        [field]: value
      });
    }
  };
  
  const resetSimulator = () => {
    setProduct(initialProduct);
    setSelectedVariantId(initialProduct.variants[0].id);
    setEditableVariant(null);
    setIsProcessing(false);
    setShowAdvanced(false);
    toast({
      title: "Simulator Reset",
      description: "All product data has been reset to default values"
    });
  };
  
  return (
    <ProductContext.Provider value={{
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
      applyPreProductLogic,
      updateVariant,
      handleVariantChange,
      resetSimulator
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Export the hook
export const useProductContext = () => useContext(ProductContext);

// Re-export types from the types file for convenience
export type { Product, ProductVariant, ProductContextType };

export default ProductContext;
