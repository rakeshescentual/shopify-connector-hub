
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { 
  AlertTriangle, 
  Tag, 
  ShoppingCart, 
  RefreshCw, 
  Download,
  Share2, 
  Copy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import VariantStatusCard from './VariantStatusCard';
import { useProductContext } from '@/contexts/ProductContext';

const ProductPreview = () => {
  const { product, isProcessing, applyPreProductLogic } = useProductContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const exportPreview = () => {
    if (!contentRef.current) return;
    
    try {
      // Create a summary object of the product state
      const summary = {
        title: product.title,
        lastProcessed: product.lastProcessed,
        tags: product.tags,
        quickBuyStatus: product.auto_quickbuydisable,
        variants: product.variants.map(v => ({
          id: v.id,
          title: v.title,
          inventory: v.inventory,
          status: v.status,
          lastUpdated: v.lastUpdated,
          metafields: v.metafields
        }))
      };
      
      // Create a formatted text version for clipboard
      const textSummary = 
`Product: ${product.title}
Last Processed: ${product.lastProcessed ? new Date(product.lastProcessed).toLocaleString() : 'Not processed'}
Tags: ${product.tags.length > 0 ? product.tags.join(', ') : 'None'}
Quick Buy: ${product.auto_quickbuydisable === 'yes' ? 'Disabled' : 'Enabled'}
Variants: ${product.variants.length}`;
      
      // Copy the text to clipboard
      navigator.clipboard.writeText(textSummary);
      
      // Also try to create a data URL for downloading JSON
      const dataStr = JSON.stringify(summary, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      // Create a download link and click it
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataUri);
      downloadAnchor.setAttribute('download', `product_simulation_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      
      toast({
        title: "Export Successful",
        description: "Summary copied to clipboard and JSON file downloaded",
      });
    } catch (error) {
      console.error('Error exporting preview:', error);
      toast({
        title: "Export Failed",
        description: "Could not export the preview data",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    if (!contentRef.current) return;
    
    try {
      const variantSummaries = product.variants.map(v => {
        const activeTag = Object.entries(v.metafields)
          .find(([key, value]) => key.startsWith('auto_preproduct_preorder') && value === 'yes');
        
        return `${v.title}: ${v.inventory > 0 ? 'In Stock' : 'Out of Stock'}${activeTag ? `, ${activeTag[0].replace('auto_preproduct_preorder_', '')}` : ''}`;
      }).join('\n- ');
      
      const textSummary = 
`PRODUCT SIMULATION RESULTS
--------------------------
Product: ${product.title}
Processed: ${product.lastProcessed ? new Date(product.lastProcessed).toLocaleString() : 'Not processed'}

TAGS: ${product.tags.length > 0 ? product.tags.join(', ') : 'None'}
QUICK BUY: ${product.auto_quickbuydisable === 'yes' ? 'Disabled' : 'Enabled'}

VARIANTS:
- ${variantSummaries}`;
      
      navigator.clipboard.writeText(textSummary);
      
      toast({
        title: "Copied to Clipboard",
        description: "Simulation results copied to clipboard",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Copy Failed",
        description: "Could not copy results to clipboard",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="glass-card border-none animate-slide-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Preview</CardTitle>
            <CardDescription>
              See how the product would appear with PreProduct integration
            </CardDescription>
            {product.lastProcessed && (
              <p className="text-xs text-muted-foreground mt-1">
                Last processed: {new Date(product.lastProcessed).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={copyToClipboard}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={exportPreview}
              title="Export results"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6" ref={contentRef}>
        <div>
          <h3 className="text-lg font-medium">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.variants.length} variants</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Product Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.length > 0 ? (
              product.tags.map(tag => (
                <Badge key={tag} className="flex items-center gap-1">
                  <Tag size={12} />
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tags applied</p>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Quick Buy Status:</h4>
          {product.auto_quickbuydisable === 'yes' ? (
            <div className="flex items-center text-sm text-amber-600">
              <AlertTriangle size={16} className="mr-2" />
              Quick Buy Disabled
            </div>
          ) : (
            <div className="flex items-center text-sm text-green-600">
              <ShoppingCart size={16} className="mr-2" />
              Quick Buy Enabled
            </div>
          )}
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-3">Variant Status:</h4>
          <div className="space-y-3">
            {product.variants.map(variant => (
              <VariantStatusCard key={variant.id} variant={variant} />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Apply PreProduct Logic'
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apply PreProduct Logic</AlertDialogTitle>
              <AlertDialogDescription>
                This will process all variants according to the PreProduct business rules and update product tags and status. Continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={applyPreProductLogic} className="bg-primary text-primary-foreground">
                Apply Logic
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ProductPreview;
