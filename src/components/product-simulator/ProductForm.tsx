
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Package, Plus, RefreshCw, RotateCcw } from 'lucide-react';
import VariantFormTabs from './VariantFormTabs';
import { useProductContext } from '@/contexts/ProductContext';

const ProductForm = () => {
  const { 
    product, 
    selectedVariantId, 
    setSelectedVariantId, 
    addVariant, 
    updateVariant,
    resetSimulator
  } = useProductContext();

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="h-5 w-5 text-primary" />
          Edit Product Variant
        </CardTitle>
        <CardDescription>
          Modify variant properties to test PreProduct logic
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 mb-6">
          <div className="w-3/4">
            <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
              <SelectTrigger className="bg-background/80 backdrop-blur-sm border-primary/20">
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
          <Button 
            variant="outline" 
            className="w-1/4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10" 
            onClick={addVariant}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <VariantFormTabs />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Simulator</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all changes made to the product and variants. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetSimulator} className="bg-destructive text-destructive-foreground">
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button 
          className="bg-primary/90 hover:bg-primary"
          onClick={updateVariant}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Update Variant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
