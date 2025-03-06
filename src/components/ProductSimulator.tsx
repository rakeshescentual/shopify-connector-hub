import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { AlertTriangle, Info, Tag, ShoppingCart, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductVariant {
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
    'custom.discontinued': '' | 'By Manufacturer' | 'Delisted' | 'No';
    'custom.ordering_min_qty': number;
    auto_preproduct_disablebutton: 'yes' | 'no';
  };
  backorderWeeks: number;
}

interface Product {
  id: string;
  title: string;
  variants: ProductVariant[];
  tags: string[];
  auto_quickbuydisable: 'yes' | 'no';
}

type MetafieldKey = keyof ProductVariant['metafields'];

const ProductSimulator = () => {
  const initialProduct: Product = {
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
          'custom.discontinued': 'No',
          'custom.ordering_min_qty': 0,
          auto_preproduct_disablebutton: 'no'
        },
        backorderWeeks: 0
      }
    ],
    tags: [],
    auto_quickbuydisable: 'no'
  };

  const [product, setProduct] = useState<Product>(initialProduct);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editableVariant, setEditableVariant] = useState<ProductVariant | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  useEffect(() => {
    setEditableVariant({...selectedVariant});
  }, [selectedVariantId]);

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant${product.variants.length + 1}`,
      title: `New Variant ${product.variants.length + 1}`,
      inventory: 10,
      hadStockBefore: false,
      launchDate: null,
      metafields: {
        auto_preproduct_preorder: 'no',
        auto_preproduct_preorder_launch: 'no',
        auto_preproduct_preorder_specialorder: 'no',
        auto_preproduct_preorder_backorder: 'no',
        auto_preproduct_preorder_notifyme: 'no',
        auto_preproduct_preorder_discontinued: 'no',
        'custom.discontinued': 'No',
        'custom.ordering_min_qty': 0,
        auto_preproduct_disablebutton: 'no'
      },
      backorderWeeks: 0
    };
    
    setProduct(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
    
    setSelectedVariantId(newVariant.id);
    toast({
      title: "Variant Added",
      description: `Added new variant: ${newVariant.title}`,
    });
  };

  const applyPreProductLogic = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const updatedProduct = {...product};
      
      updatedProduct.variants = updatedProduct.variants.map(variant => {
        const updatedVariant = {...variant};
        const metafields = {...updatedVariant.metafields};
        
        Object.keys(metafields).forEach(key => {
          if (key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton') {
            (metafields as any)[key] = 'no';
          }
        });
        
        if (metafields['custom.discontinued'] === 'By Manufacturer' || metafields['custom.discontinued'] === 'Delisted') {
          metafields.auto_preproduct_preorder_discontinued = 'yes';
          metafields.auto_preproduct_disablebutton = 'yes';
        } else {
          metafields.auto_preproduct_disablebutton = 'no';
        }
        
        if (updatedVariant.launchDate && new Date(updatedVariant.launchDate) > new Date()) {
          metafields.auto_preproduct_preorder_launch = 'yes';
        }
        
        if (
          updatedVariant.inventory <= 0 && 
          metafields['custom.discontinued'] !== 'By Manufacturer' && 
          metafields['custom.ordering_min_qty'] === 1 &&
          metafields.auto_preproduct_preorder_discontinued === 'no' &&
          metafields.auto_preproduct_preorder_launch === 'no'
        ) {
          metafields.auto_preproduct_preorder_specialorder = 'yes';
        }
        
        if (
          updatedVariant.inventory <= 0 && 
          metafields['custom.discontinued'] !== 'By Manufacturer' && 
          metafields['custom.discontinued'] !== 'Delisted' &&
          metafields.auto_preproduct_preorder_discontinued === 'no' &&
          metafields.auto_preproduct_preorder_launch === 'no' &&
          metafields.auto_preproduct_preorder_specialorder === 'no'
        ) {
          metafields.auto_preproduct_preorder_backorder = 'yes';
        }
        
        if (
          updatedVariant.backorderWeeks >= 4 && 
          metafields.auto_preproduct_preorder_backorder === 'yes'
        ) {
          metafields.auto_preproduct_preorder_backorder = 'no';
          metafields.auto_preproduct_preorder_notifyme = 'yes';
        }
        
        if (
          updatedVariant.inventory <= 0 && 
          !updatedVariant.hadStockBefore &&
          Object.entries(metafields)
            .filter(([key]) => key.startsWith('auto_preproduct_preorder') && key !== 'auto_preproduct_disablebutton')
            .every(([, value]) => value === 'no')
        ) {
          metafields.auto_preproduct_preorder = 'yes';
        }
        
        updatedVariant.metafields = metafields;
        return updatedVariant;
      });
      
      const newTags: string[] = [];
      
      ['auto_preproduct_preorder', 
       'auto_preproduct_preorder_launch', 
       'auto_preproduct_preorder_specialorder', 
       'auto_preproduct_preorder_backorder', 
       'auto_preproduct_preorder_notifyme', 
       'auto_preproduct_preorder_discontinued'].forEach(metafieldKey => {
        const tagName = metafieldKey.replace('auto_', '');
        
        if (updatedProduct.variants.some(variant => 
          variant.metafields[metafieldKey as keyof typeof variant.metafields] === 'yes'
        )) {
          newTags.push(tagName);
        }
      });
      
      const hasMultipleVariants = updatedProduct.variants.length > 1;
      const hasOutOfStockVariant = updatedProduct.variants.some(v => v.inventory <= 0);
      const hasPreProductTag = newTags.length > 0;
      
      updatedProduct.auto_quickbuydisable = (hasMultipleVariants && hasOutOfStockVariant && hasPreProductTag) 
        ? 'yes' 
        : 'no';
      
      updatedProduct.tags = newTags;
      
      setProduct(updatedProduct);
      setIsProcessing(false);
      
      toast({
        title: "PreProduct Logic Applied",
        description: `Updated product with ${newTags.length} tags and processed ${updatedProduct.variants.length} variants.`,
      });
    }, 1000);
  };

  const updateVariant = () => {
    if (!editableVariant) return;
    
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => 
        v.id === editableVariant.id ? editableVariant : v
      )
    }));
    
    toast({
      title: "Variant Updated",
      description: `Updated variant: ${editableVariant.title}`,
    });
    
    applyPreProductLogic();
  };

  const handleVariantChange = (field: string, value: any) => {
    if (!editableVariant) return;
    
    if (field.startsWith('metafields.')) {
      const metafieldKey = field.split('.')[1] as MetafieldKey;
      setEditableVariant(prev => {
        if (!prev) return prev;
        
        const updatedMetafields = { ...prev.metafields };
        
        if (metafieldKey === 'custom.ordering_min_qty') {
          updatedMetafields['custom.ordering_min_qty'] = typeof value === 'number' ? value : parseInt(value) || 0;
        } else {
          (updatedMetafields as any)[metafieldKey] = String(value);
        }
        
        return {
          ...prev,
          metafields: updatedMetafields as ProductVariant['metafields']
        };
      });
    } else {
      setEditableVariant(prev => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    }
  };

  if (!editableVariant) return <div>Loading variant...</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Simulator</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test the PreProduct logic by simulating product variants and conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="metafields">Metafields</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="variant-title">Variant Title</Label>
                      <Input 
                        id="variant-title"
                        value={editableVariant.title} 
                        onChange={(e) => handleVariantChange('title', e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="variant-discontinued">Discontinued Status</Label>
                      <Select 
                        value={editableVariant.metafields['custom.discontinued']}
                        onValueChange={(value) => handleVariantChange('metafields.custom.discontinued', value)}
                      >
                        <SelectTrigger id="variant-discontinued">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="By Manufacturer">By Manufacturer</SelectItem>
                          <SelectItem value="Delisted">Delisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="variant-launchdate">Launch Date (if future)</Label>
                      <Input 
                        id="variant-launchdate"
                        type="date" 
                        value={editableVariant.launchDate || ''} 
                        onChange={(e) => handleVariantChange('launchDate', e.target.value || null)} 
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="variant-inventory">Current Inventory</Label>
                      <Input 
                        id="variant-inventory"
                        type="number" 
                        value={editableVariant.inventory} 
                        onChange={(e) => handleVariantChange('inventory', parseInt(e.target.value))} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="variant-min-qty">Minimum Order Quantity</Label>
                      <Input 
                        id="variant-min-qty"
                        type="number" 
                        value={editableVariant.metafields['custom.ordering_min_qty']} 
                        onChange={(e) => handleVariantChange('metafields.custom.ordering_min_qty', parseInt(e.target.value))} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="variant-had-stock">Had Stock Before</Label>
                        <p className="text-xs text-gray-500">
                          Has this variant ever been in stock?
                        </p>
                      </div>
                      <Switch 
                        id="variant-had-stock"
                        checked={editableVariant.hadStockBefore} 
                        onCheckedChange={(checked) => handleVariantChange('hadStockBefore', checked)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="variant-backorder-weeks">Weeks in Backorder</Label>
                      <Input 
                        id="variant-backorder-weeks"
                        type="number" 
                        value={editableVariant.backorderWeeks} 
                        onChange={(e) => handleVariantChange('backorderWeeks', parseInt(e.target.value))} 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        After 4 consecutive weeks, "Notify Me" status will be applied
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="metafields">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md mb-2">
                      <Info size={16} className="mr-2 text-amber-500" />
                      <p className="text-xs">
                        These fields are normally auto-calculated, but you can override them for testing
                      </p>
                    </div>
                    
                    {Object.entries(editableVariant.metafields)
                      .filter(([key]) => key.startsWith('auto_preproduct_preorder'))
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <Label htmlFor={`variant-${key}`}>
                            {key.replace('auto_', '')}
                          </Label>
                          <Select 
                            value={value}
                            onValueChange={(newValue) => handleVariantChange(`metafields.${key}`, newValue)}
                          >
                            <SelectTrigger id={`variant-${key}`} className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))
                    }
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.location.reload()}>Reset</Button>
              <Button onClick={updateVariant}>Update Variant</Button>
            </CardFooter>
          </Card>

          <Card className="glass-card border-none animate-slide-up">
            <CardHeader>
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>
                See how the product would appear with PreProduct integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  {product.variants.map(variant => {
                    const isOutOfStock = variant.inventory <= 0;
                    const isDiscontinued = variant.metafields['custom.discontinued'] === 'By Manufacturer' || 
                                           variant.metafields['custom.discontinued'] === 'Delisted';
                    const disableButton = variant.metafields.auto_preproduct_disablebutton === 'yes';
                    
                    const activeMetafield = Object.entries(variant.metafields)
                      .find(([key, value]) => key.startsWith('auto_preproduct_preorder') && 
                                              key !== 'auto_preproduct_disablebutton' && 
                                              value === 'yes');
                    
                    const status = activeMetafield ? 
                      activeMetafield[0].replace('auto_', '') : 
                      (isOutOfStock ? 'Out of Stock' : 'In Stock');
                      
                    return (
                      <div key={variant.id} className="p-3 border rounded-md flex items-center justify-between">
                        <div>
                          <p className="font-medium">{variant.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {isOutOfStock ? (
                              <Badge variant="outline" className="text-red-500 border-red-200">
                                Out of Stock
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-green-500 border-green-200">
                                In Stock ({variant.inventory})
                              </Badge>
                            )}
                            
                            {activeMetafield && (
                              <Badge className="bg-blue-500">
                                {activeMetafield[0].replace('auto_', '')}
                              </Badge>
                            )}
                            
                            {isDiscontinued && (
                              <Badge variant="destructive">
                                Discontinued
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button 
                          disabled={disableButton} 
                          variant={disableButton ? "outline" : "default"}
                          size="sm"
                        >
                          {disableButton ? "Unavailable" : "Add to Cart"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={applyPreProductLogic} 
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductSimulator;
