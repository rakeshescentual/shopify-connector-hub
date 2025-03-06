
import { ProductVariant, MetafieldKey } from './types';
import { toast } from '@/components/ui/use-toast';

/**
 * Handles changes to a variant's fields and applies appropriate business logic
 */
export const handleVariantChange = (
  field: string, 
  value: any, 
  editableVariant: ProductVariant | null,
  setEditableVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>
): void => {
  if (!editableVariant) {
    console.error("Cannot handle change: No variant selected");
    return;
  }
  
  try {
    if (field.startsWith('metafields.')) {
      handleMetafieldChange(field, value, editableVariant, setEditableVariant);
    } else if (field === 'inventory') {
      // Ensure inventory is always a number
      const numValue = typeof value === 'number' ? value : parseInt(value) || 0;
      updateVariantField(editableVariant, setEditableVariant, field, numValue);
    } else if (field === 'backorderWeeks') {
      // Ensure backorderWeeks is always a non-negative number
      const numValue = typeof value === 'number' ? value : parseInt(value) || 0;
      updateVariantField(editableVariant, setEditableVariant, field, Math.max(0, numValue));
    } else {
      // Handle regular field changes
      updateVariantField(editableVariant, setEditableVariant, field, value);
    }
  } catch (error) {
    console.error('Error handling variant change:', error);
    toast({
      title: "Error",
      description: `Failed to update field ${field}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive"
    });
  }
};

/**
 * Updates a specific field in the variant
 */
const updateVariantField = (
  variant: ProductVariant,
  setEditableVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>,
  field: string,
  value: any
): void => {
  setEditableVariant(prev => {
    if (!prev) return prev;
    return { ...prev, [field]: value };
  });
};

/**
 * Handles changes to a variant's metafields
 */
const handleMetafieldChange = (
  field: string,
  value: any,
  editableVariant: ProductVariant,
  setEditableVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>
): void => {
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
  } else if (metafieldKey === 'custom.ordering_min_qty') {
    // Ensure value is at least 1 for ordering_min_qty
    setEditableVariant(prev => {
      if (!prev) return prev;
      
      const updatedMetafields = { ...prev.metafields };
      const parsedValue = typeof value === 'number' ? value : parseInt(value) || 1;
      updatedMetafields['custom.ordering_min_qty'] = Math.max(1, parsedValue);
      
      return {
        ...prev,
        metafields: updatedMetafields
      };
    });
  } else {
    // Handle all other metafield changes
    setEditableVariant(prev => {
      if (!prev) return prev;
      
      const updatedMetafields = { ...prev.metafields };
      
      // Use type casting to handle the string conversion properly
      (updatedMetafields as any)[metafieldKey] = value;
      
      return {
        ...prev,
        metafields: updatedMetafields
      };
    });
  }
};
