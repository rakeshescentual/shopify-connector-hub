
import React from 'react';
import { ProductProvider } from '@/contexts/ProductContext';
import ProductForm from '@/components/product-simulator/ProductForm';
import ProductPreview from '@/components/product-simulator/ProductPreview';
import { AlertCircle, CheckCircle, Info, Tag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

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

        <Tabs defaultValue="instructions" className="max-w-6xl mx-auto mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instructions" className="flex items-center gap-1">
              <Info className="h-4 w-4" /> Instructions
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Best Practices
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> Tag Effects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-2">How to use this simulator</h3>
                    <ol className="text-amber-700 text-sm space-y-1">
                      <li>1. Edit variant properties like inventory, discontinued status, or launch date</li>
                      <li>2. Click "Update Variant" to save your changes</li>
                      <li>3. Click "Apply PreProduct Logic" to see how the product status would be updated</li>
                      <li>4. Create multiple variants to test different product conditions</li>
                      <li>5. Use the search and filter functions to find specific variants</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-primary">Recommended Testing Scenarios</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Multiple Variant States</h4>
                      <p className="text-xs text-gray-600">
                        Create variants with different inventory levels, discontinued statuses, and launch dates to see how they affect each other.
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Priority Testing</h4>
                      <p className="text-xs text-gray-600">
                        Set conflicting conditions to see which rules take precedence (e.g., discontinued vs. backorder).
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Group Naming</h4>
                      <p className="text-xs text-gray-600">
                        For better organization, name variants with a prefix followed by a dash (e.g., "Color-Red", "Size-Large").
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Edge Cases</h4>
                      <p className="text-xs text-gray-600">
                        Test combinations of zero inventory, max backorder weeks, and various discontinued states.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tags">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Each tag has a specific effect on how the product displays on your storefront:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder</span>: "Coming Soon" button, no estimated date
                    </div>
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder_launch</span>: "Pre-order" button with launch date
                    </div>
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder_specialorder</span>: "Special Order" button
                    </div>
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder_backorder</span>: "Backorder" button
                    </div>
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder_notifyme</span>: "Notify Me" form replaces add button
                    </div>
                    <div className="border p-2 rounded-md">
                      <span className="font-medium">preproduct_preorder_discontinued</span>: "Discontinued" message
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2">
                    Note: The actual display on your storefront depends on your theme and PreProduct app settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
