
import React from 'react';
import { ProductProvider } from '@/contexts/ProductContext';
import ProductForm from '@/components/product-simulator/ProductForm';
import ProductPreview from '@/components/product-simulator/ProductPreview';

const ProductSimulator = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Simulator</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test the PreProduct logic by simulating product variants and conditions.
          </p>
        </div>

        <ProductProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ProductForm />
            <ProductPreview />
          </div>
        </ProductProvider>
      </div>
    </section>
  );
};

export default ProductSimulator;
