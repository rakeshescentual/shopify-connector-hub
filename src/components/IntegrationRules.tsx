
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, AlertCircle, Clock, Tag, Database } from 'lucide-react';

const IntegrationRules = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PreProduct Integration Rules</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand how the app manages product tags and metafields to integrate with PreProduct.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="glass-card border-none overflow-hidden animate-slide-up mb-12">
            <Tabs defaultValue="overview">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Integration Logic</CardTitle>
                  <TabsList>
                    <TabsTrigger value="overview" className="flex items-center">
                      <Database size={14} className="mr-1.5" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="conditions" className="flex items-center">
                      <AlertCircle size={14} className="mr-1.5" />
                      Conditions
                    </TabsTrigger>
                    <TabsTrigger value="tags" className="flex items-center">
                      <Tag size={14} className="mr-1.5" />
                      Tags
                    </TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  Core rules for how product data is processed and tagged
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Core Integration Rules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center mb-2">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Metafield Exclusivity
                        </h4>
                        <p className="text-sm text-gray-600">
                          Each variant can have only ONE auto_preproduct_ metafield set to "yes" at any time.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center mb-2">
                          <Tag size={16} className="text-blue-500 mr-2" />
                          Tag Application
                        </h4>
                        <p className="text-sm text-gray-600">
                          A product tag is applied if ANY variant has the corresponding auto_preproduct_ metafield set to "yes."
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center mb-2">
                          <XCircle size={16} className="text-red-500 mr-2" />
                          Tag Removal
                        </h4>
                        <p className="text-sm text-gray-600">
                          A product tag is removed when NO variants have the corresponding auto_preproduct_ metafield set to "yes."
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center mb-2">
                          <AlertCircle size={16} className="text-amber-500 mr-2" />
                          Prioritization
                        </h4>
                        <p className="text-sm text-gray-600">
                          "Discontinued and Out of Stock" takes precedence. preproduct_preorder has lowest priority.
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-xl font-semibold">Additional Logic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">auto_preproduct_disablebutton</h4>
                        <p className="text-sm text-gray-600">
                          Set to "yes" if custom.discontinued is "By Manufacturer" or "Delisted," otherwise "no."
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">auto_quickbuydisable</h4>
                        <p className="text-sm text-gray-600">
                          Set to "yes" if the product has multiple variants, one is out of stock, and an auto_preproduct_ tag is active, otherwise "no."
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="conditions" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Metafield Conditions</h3>
                    <p className="text-gray-600 mb-4">
                      Each auto_preproduct_ metafield is set based on specific inventory and product conditions:
                    </p>
                    
                    <Table>
                      <TableCaption>Conditions for setting auto_preproduct_ metafields to "yes"</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/4">Metafield</TableHead>
                          <TableHead>Condition</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder</TableCell>
                          <TableCell>Inventory ≤ 0 AND no other auto_preproduct_ metafields are "yes" AND variant has never had stock before.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder_launch</TableCell>
                          <TableCell>Variant has a future launchDate set.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder_specialorder</TableCell>
                          <TableCell>Inventory ≤ 0, custom.discontinued is not "By Manufacturer", custom.ordering_min_qty is exactly 1, and no other higher priority preproduct metafields are "yes".</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder_backorder</TableCell>
                          <TableCell>custom.discontinued is not "By Manufacturer" or "Delisted" and no other higher priority preproduct metafields are "yes".</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder_notifyme</TableCell>
                          <TableCell>Product has been in backorder status for 4 consecutive weeks (timer resets if stock arrives temporarily).</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">auto_preproduct_preorder_discontinued</TableCell>
                          <TableCell>custom.discontinued is "By Manufacturer" OR "Delisted."</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="tags" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Product Tags</h3>
                    <p className="text-gray-600 mb-4">
                      Product tags are applied based on variant metafields:
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder</Badge>
                        <p className="text-xs text-gray-600">Applied for first-time inventory items not yet in stock</p>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder_launch</Badge>
                        <p className="text-xs text-gray-600">Applied for products with future launch dates</p>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder_specialorder</Badge>
                        <p className="text-xs text-gray-600">Applied for special ordered items with specific conditions</p>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder_backorder</Badge>
                        <p className="text-xs text-gray-600">Applied for active products temporarily out of stock</p>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder_notifyme</Badge>
                        <p className="text-xs text-gray-600">Applied after extended backorder periods</p>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <Badge className="mb-2">preproduct_preorder_discontinued</Badge>
                        <p className="text-xs text-gray-600">Applied for items discontinued by manufacturer</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IntegrationRules;
