
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
      
      // Add status message about inventory change
      updateVariantField(editableVariant, setEditableVariant, 'statusMessage', 
        `Inventory updated to ${numValue}. This may affect product availability status.`);
    } else if (field === 'backorderWeeks') {
      // Ensure backorderWeeks is always a non-negative number
      const numValue = typeof value === 'number' ? value : parseInt(value) || 0;
      const validValue = Math.max(0, numValue);
      updateVariantField(editableVariant, setEditableVariant, field, validValue);
      
      // Add note about backorder weeks impact
      if (validValue >= 4) {
        updateVariantField(editableVariant, setEditableVariant, 'statusMessage', 
          `Backorder set to ${validValue} weeks. Products with 4+ weeks may trigger "Notify Me" status.`);
      }
    } else {
      // Handle regular field changes
      updateVariantField(editableVariant, setEditableVariant, field, value);
    }
    
    // Track history of changes
    const timestamp = new Date().toLocaleTimeString();
    const changeLog = `${timestamp}: Changed ${field} to ${value}`;
    
    setEditableVariant(prev => {
      if (!prev) return prev;
      const history = prev.processingHistory || [];
      return {
        ...prev,
        processingHistory: [...history, changeLog].slice(-10) // Keep last 10 entries
      };
    });
    
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
      
      // Update status message
      const statusMessage = `Manual override: ${metafieldKey.replace('auto_preproduct_', '')} set to "yes"`;
      
      return {
        ...prev,
        metafields: updatedMetafields,
        statusMessage: statusMessage
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
        metafields: updatedMetafields,
        statusMessage: `Minimum order quantity set to ${Math.max(1, parsedValue)}`
      };
    });
  } else if (metafieldKey === 'custom.discontinued') {
    // Handle discontinued status changes
    setEditableVariant(prev => {
      if (!prev) return prev;
      
      const updatedMetafields = { ...prev.metafields };
      (updatedMetafields as any)[metafieldKey] = value;
      
      let statusMessage = '';
      if (value === 'By Manufacturer' || value === 'Delisted') {
        statusMessage = `Variant marked as discontinued (${value}). This will disable purchasing when out of stock.`;
      } else if (value === 'No') {
        statusMessage = 'Discontinued status removed. Normal availability rules will apply.';
      } else {
        statusMessage = `Discontinued status set to "${value}"`;
      }
      
      return {
        ...prev,
        metafields: updatedMetafields,
        statusMessage: statusMessage
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
