
export type DiscontinuedValue = 'No' | 'By Manufacturer' | 'By Us' | 'Special Order' | 'Delisted' | '';

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
    auto_preproduct_disablebutton: 'yes' | 'no';
    'custom.discontinued': DiscontinuedValue;
    'custom.ordering_min_qty': number;
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

export interface ProductContextType {
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
