
import { ProductVariant, MetafieldKey } from './types';

/**
 * Handles changes to a variant's fields and applies appropriate business logic
 */
export const handleVariantChange = (
  field: string, 
  value: any, 
  editableVariant: ProductVariant | null,
  setEditableVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>
): void => {
  if (!editableVariant) return;
  
  try {
    if (field.startsWith('metafields.')) {
      handleMetafieldChange(field, value, editableVariant, setEditableVariant);
    } else {
      // Handle regular field changes
      setEditableVariant(prev => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    }
  } catch (error) {
    console.error('Error handling variant change:', error);
  }
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
  } else {
    setEditableVariant(prev => {
      if (!prev) return prev;
      
      const updatedMetafields = { ...prev.metafields };
      
      if (metafieldKey === 'custom.ordering_min_qty') {
        // Ensure value is at least 1
        const parsedValue = typeof value === 'number' ? value : parseInt(value) || 1;
        updatedMetafields['custom.ordering_min_qty'] = Math.max(1, parsedValue);
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
};
