import React, { createContext, useState, useContext, ReactNode } from 'react';

type DiscontinuedValue = 'No' | 'By Manufacturer' | 'Delisted' | '';

export interface ProductVariant {
  id: string;
  title: string;
  inventory: number;
  hadStockBefore: boolean;
  launchDate: string | null;
  metafields: {
    auto_preproduct_preorder: 'yes' | 'no';
    auto_preproduct_preorder_launch: 'yes' | 'no';
    auto_preproduct_preorder_specialorder: 'yes' | 'no';
    auto_preproduct_preorder_backorder: 'yes' | 'no';
    auto_preproduct_preorder_notifyme: 'yes' | 'no';
    auto_preproduct_preorder_discontinued: 'yes' | 'no';
    'custom.discontinued': DiscontinuedValue;
    'custom.ordering_min_qty': number;
    auto_preproduct_disablebutton: 'yes' | 'no';
  };
  backorderWeeks: number;
}

export interface Product {
  id: string;
  title: string;
  variants: ProductVariant[];
  tags: string[];
  auto_quickbuydisable: 'yes' | 'no';
}

export type MetafieldKey = keyof ProductVariant['metafields'];

interface ProductContextType {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  selectedVariantId: string;
  setSelectedVariantId: React.Dispatch<React.SetStateAction<string>>;
  selectedVariant: ProductVariant;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  editableVariant: ProductVariant | null;
  setEditableVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>;
  showAdvanced: boolean;
  setShowAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
  addVariant: () => void;
  applyPreProductLogic: () => void;
  updateVariant: () => void;
  handleVariantChange: (field: string, value: any) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialProduct: Product = {
    id: 'product1',
    title: 'Sample Fragrance',
    variants: [
      {
        id: 'variant1',
        title: '50ml',
        inventory: 10,
        hadStockBefore: true,
        launchDate: null,
        metafields: {
          auto_preproduct_preorder: 'no',
          auto_preproduct_preorder_launch: 'no',
          auto_preproduct_preorder_specialorder: 'no',
          auto_preproduct_preorder_backorder: 'no',
          auto_preproduct_preorder_notifyme: 'no',
          auto_preproduct_preorder_discontinued: 'no',
          'custom.discontinued': 'No',
          'custom.ordering_min_qty': 0,
          auto_preproduct_disablebutton: 'no'
        },
        backorderWeeks: 0
      }
    ],
    tags: [],
    auto_quickbuydisable: 'no'
  };

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
    const newVariant: ProductVariant = {
      id: `variant${product.variants.length + 1}`,
      title: `New Variant ${product.variants.length + 1}`,
      inventory: 10,
      hadStockBefore: false,
      launchDate: null,
      metafields: {
        auto_preproduct_preorder: 'no',
        auto_preproduct_preorder_launch: 'no',
        auto_preproduct_preorder_specialorder: 'no',
        auto_preproduct_preorder_backorder: 'no',
        auto_preproduct_preorder_notifyme: 'no',
        auto_preproduct_preorder_discontinued: 'no',
        'custom.discontinued': 'No',
        'custom.ordering_min_qty': 0,
        auto_preproduct_disablebutton: 'no'
      },
      backorderWeeks: 0
    };
    
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

  const isDiscontinued = (discontinuedValue: DiscontinuedValue): boolean => {
    return discontinuedValue === 'By Manufacturer' || discontinuedValue === 'Delisted';
  };

  const applyPreProductLogic = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const updatedProduct = {...product};
      
      // Step 1: Reset all preproduct metafields
      updatedProduct.variants = updatedProduct.variants.map(variant => {
        const updatedVariant = {...variant};
        const metafields = {...updatedVariant.metafields};
        
        // Reset all preproduct metafields to "no" first
        Object.keys(metafields).forEach(key => {
          if (key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton') {
            (metafields as any)[key] = 'no';
          }
        });
        
        updatedVariant.metafields = metafields;
        return updatedVariant;
      });

      // Step 2: Apply variant-specific logic based on priority order
      updatedProduct.variants = updatedProduct.variants.map(variant => {
        const updatedVariant = {...variant};
        const metafields = {...updatedVariant.metafields};
        const discontinuedValue = metafields['custom.discontinued'];
        
        // Define priority order for preproduct metafields
        // 1. Discontinued (highest priority)
        // 2. Launch pre-order
        // 3. Special order
        // 4. Notify me
        // 5. Backorder
        // 6. Pre-order (lowest priority)
        
        // Check for discontinued items first (highest priority)
        if (isDiscontinued(discontinuedValue)) {
          metafields.auto_preproduct_preorder_discontinued = 'yes';
          metafields.auto_preproduct_disablebutton = 'yes';
          updatedVariant.metafields = metafields;
          return updatedVariant;
        } else {
          metafields.auto_preproduct_disablebutton = 'no';
        }
        
        // Check for launch dates (second priority)
        if (updatedVariant.launchDate) {
          const launchDate = new Date(updatedVariant.launchDate);
          const currentDate = new Date();
          
          // Only set launch tag if the launch date is in the future
          if (launchDate > currentDate) {
            metafields.auto_preproduct_preorder_launch = 'yes';
            updatedVariant.metafields = metafields;
            return updatedVariant;
          }
        }
        
        // Check for special order conditions (third priority)
        if (
          updatedVariant.inventory <= 0 && 
          !isDiscontinued(discontinuedValue) &&
          metafields['custom.ordering_min_qty'] === 1
        ) {
          metafields.auto_preproduct_preorder_specialorder = 'yes';
          updatedVariant.metafields = metafields;
          return updatedVariant;
        }
        
        // Check for notify me conditions (extended backorder) (fourth priority)
        // If the variant has been in backorder for 4 or more weeks
        if (
          updatedVariant.inventory <= 0 && 
          !isDiscontinued(discontinuedValue) &&
          updatedVariant.backorderWeeks >= 4
        ) {
          metafields.auto_preproduct_preorder_notifyme = 'yes';
          updatedVariant.metafields = metafields;
          return updatedVariant;
        }
        
        // Check for backorder conditions (fifth priority)
        if (
          updatedVariant.inventory <= 0 && 
          !isDiscontinued(discontinuedValue)
        ) {
          metafields.auto_preproduct_preorder_backorder = 'yes';
          updatedVariant.metafields = metafields;
          return updatedVariant;
        }
        
        // Apply preproduct_preorder according to refined logic (lowest priority)
        // Only if the variant has never had stock before
        if (
          updatedVariant.inventory <= 0 && 
          !updatedVariant.hadStockBefore
        ) {
          metafields.auto_preproduct_preorder = 'yes';
        }
        
        updatedVariant.metafields = metafields;
        return updatedVariant;
      });
      
      // Step 3: Generate product tags based on variant metafields
      const newTags: string[] = [];
      const metafieldKeys = [
        'auto_preproduct_preorder',
        'auto_preproduct_preorder_launch',
        'auto_preproduct_preorder_specialorder',
        'auto_preproduct_preorder_backorder',
        'auto_preproduct_preorder_notifyme',
        'auto_preproduct_preorder_discontinued'
      ];
      
      metafieldKeys.forEach(metafieldKey => {
        const tagName = metafieldKey.replace('auto_', '');
        const hasVariantWithMetafield = updatedProduct.variants.some(variant => 
          variant.metafields[metafieldKey as keyof typeof variant.metafields] === 'yes'
        );
        
        if (hasVariantWithMetafield) {
          newTags.push(tagName);
        }
      });
      
      // Step 4: Update Quick Buy status based on variant conditions
      const hasMultipleVariants = updatedProduct.variants.length > 1;
      const hasOutOfStockVariant = updatedProduct.variants.some(v => v.inventory <= 0);
      const hasPreProductTag = newTags.length > 0;
      
      updatedProduct.auto_quickbuydisable = (hasMultipleVariants && hasOutOfStockVariant && hasPreProductTag) 
        ? 'yes' 
        : 'no';
      
      updatedProduct.tags = newTags;
      setProduct(updatedProduct);
      setIsProcessing(false);
      
      toast({
        title: "PreProduct Logic Applied",
        description: `Updated product with ${newTags.length} tags and processed ${updatedProduct.variants.length} variants.`,
      });
    }, 1000);
  };

  const updateVariant = () => {
    if (!editableVariant) return;
    
    // Validate only one preproduct metafield is set to "yes" for this variant
    const preproductMetafields = Object.entries(editableVariant.metafields)
      .filter(([key, value]) => 
        key.startsWith('auto_preproduct_preorder') && 
        key !== 'auto_preproduct_disablebutton' && 
        value === 'yes'
      );
    
    if (preproductMetafields.length > 1) {
      toast({
        title: "Validation Error",
        description: "Only one preproduct metafield can be set to 'yes' per variant at a time. Please fix and try again.",
        variant: "destructive"
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
    
    applyPreProductLogic();
  };

  const handleVariantChange = (field: string, value: any) => {
    if (!editableVariant) return;
    
    if (field.startsWith('metafields.')) {
      const metafieldKey = field.split('.')[1] as MetafieldKey;
      
      // If setting a preproduct metafield to "yes", ensure all others are "no" for THIS variant
      if (
        metafieldKey.startsWith('auto_preproduct_preorder') && 
        metafieldKey !== 'auto_preproduct_disablebutton' && 
        value === 'yes'
      ) {
        setEditableVariant(prev => {
          if (!prev) return prev;
          
          const updatedMetafields = { ...prev.metafields };
          
          // Set all preproduct metafields to "no" first
          Object.keys(updatedMetafields).forEach(key => {
            if (key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton') {
              (updatedMetafields as any)[key] = 'no';
            }
          });
          
          // Then set the requested one to "yes"
          (updatedMetafields as any)[metafieldKey] = 'yes';
          
          return {
            ...prev,
            metafields: updatedMetafields
          };
        });
      } else {
        setEditableVariant(prev => {
          if (!prev) return prev;
          
          const updatedMetafields = { ...prev.metafields };
          
          if (metafieldKey === 'custom.ordering_min_qty') {
            updatedMetafields['custom.ordering_min_qty'] = typeof value === 'number' ? value : parseInt(value) || 0;
          } else {
            // Use type casting to handle the string conversion properly
            (updatedMetafields as any)[metafieldKey] = String(value);
          }
          
          return {
            ...prev,
            metafields: updatedMetafields
          };
        });
      }
    } else {
      setEditableVariant(prev => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    }
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
    applyPreProductLogic,
    updateVariant,
    handleVariantChange
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

import { toast } from '@/components/ui/use-toast';
