
import { Product } from './types';

export const initialProduct: Product = {
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
        auto_preproduct_disablebutton: 'no',
        'custom.discontinued': 'No',
        'custom.ordering_min_qty': 1
      },
      backorderWeeks: 0
    }
  ],
  tags: [],
  auto_quickbuydisable: 'no'
};
