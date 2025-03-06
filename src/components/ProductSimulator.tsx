
import React from 'react';
import { ProductProvider } from '@/contexts/ProductContext';
import ProductForm from '@/components/product-simulator/ProductForm';
import ProductPreview from '@/components/product-simulator/ProductPreview';
import { Info } from 'lucide-react';

const ProductSimulator = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Product Simulator
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test the PreProduct logic by simulating product variants and conditions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
          <Info className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 mb-1">How to use this simulator</h3>
            <p className="text-amber-700 text-sm">
              1. Edit variant properties like inventory, discontinued status, or launch date<br />
              2. Click "Update Variant" to save your changes<br />
              3. Click "Apply PreProduct Logic" to see how the product status would be updated<br />
              4. Create multiple variants to test different product conditions
            </p>
          </div>
        </div>

        <ProductProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass-effect rounded-xl p-2 shadow-lg animate-fade-in">
              <ProductForm />
            </div>
            <div className="glass-effect rounded-xl p-2 shadow-lg animate-fade-in">
              <ProductPreview />
            </div>
          </div>
        </ProductProvider>
      </div>
    </section>
  );
};

export default ProductSimulator;
