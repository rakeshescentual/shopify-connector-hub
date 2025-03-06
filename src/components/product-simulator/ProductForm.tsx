
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Package, RefreshCw, RotateCcw } from 'lucide-react';
import VariantFormTabs from './VariantFormTabs';
import VariantSelector from './VariantSelector';
import { useProductContext } from '@/contexts/ProductContext';

const ProductForm = () => {
  const { 
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
        <VariantSelector />

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
