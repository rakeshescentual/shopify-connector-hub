
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VariantFormTabs from './VariantFormTabs';
import { useProductContext } from '@/contexts/ProductContext';

const ProductForm = () => {
  const { 
    product, 
    selectedVariantId, 
    setSelectedVariantId, 
    addVariant, 
    updateVariant 
  } = useProductContext();

  return (
    <Card className="glass-card border-none animate-slide-up">
      <CardHeader>
        <CardTitle>Edit Product Variant</CardTitle>
        <CardDescription>
          Modify variant properties to test PreProduct logic
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 mb-4">
          <div className="w-3/4">
            <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map(variant => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="w-1/4" onClick={addVariant}>Add Variant</Button>
        </div>

        <VariantFormTabs />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>Reset</Button>
        <Button onClick={updateVariant}>Update Variant</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
