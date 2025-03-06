<lov-codelov-code>
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Code, FileCode, WrenchIcon, DatabaseIcon, ChevronRight, ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GadgetTransferGuide from '@/components/GadgetTransferGuide';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Developer Documentation</h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive technical documentation for the PreProduct integration platform.
              </p>
            </div>
            
            <Tabs defaultValue="architecture" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="integration">Integration APIs</TabsTrigger>
                <TabsTrigger value="gadget">Gadget.dev Guide</TabsTrigger>
                <TabsTrigger value="data-models">Data Models</TabsTrigger>
              </TabsList>
              
              <TabsContent value="architecture" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>System Architecture</CardTitle>
                    <CardDescription>
                      Overview of the PreProduct application architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Core Components</h3>
                      <p className="text-muted-foreground mb-4">
                        The application follows a React-based architecture with clear separation of concerns:
                      </p>
                      
                      <ul className="space-y-4">
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <FileCode className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">Context Layer</h4>
                              <p className="text-sm text-muted-foreground">
                                Management of application state and business logic through React Context API.
                                Located in <code>src/contexts/product/</code>
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <Code className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">Processing Logic</h4>
                              <p className="text-sm text-muted-foreground">
                                Core business logic for variant and product processing in separate modules:
                                <code>variantProcessor.ts</code>, <code>productProcessors.ts</code>, and 
                                <code>preProductLogic.ts</code>
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <WrenchIcon className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">UI Components</h4>
                              <p className="text-sm text-muted-foreground">
                                Presentation layer with reusable components. Simulator and documentation
                                interfaces in <code>src/components/</code>
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Data Flow</h3>
                      <p className="text-muted-foreground mb-4">
                        The application follows a unidirectional data flow:
                      </p>
                      
                      <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6 py-2">
                        <li className="mb-6 ml-6">
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-4 ring-white dark:ring-gray-900">
                            1
                          </span>
                          <h3 className="flex items-center mb-1 text-lg font-semibold">
                            User Input Capture
                          </h3>
                          <p className="text-base font-normal text-muted-foreground">
                            Form data is collected via controlled components and stored in the ProductContext
                          </p>
                        </li>
                        
                        <li className="mb-6 ml-6">
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-4 ring-white dark:ring-gray-900">
                            2
                          </span>
                          <h3 className="flex items-center mb-1 text-lg font-semibold">
                            Processing Trigger
                          </h3>
                          <p className="text-base font-normal text-muted-foreground">
                            The <code>applyPreProductLogic</code> function processes all variants using rule-based logic
                          </p>
                          <ChevronRight className="h-5 w-5 text-muted-foreground my-1 ml-2" />
                        </li>
                        
                        <li className="mb-6 ml-6">
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-4 ring-white dark:ring-gray-900">
                            3
                          </span>
                          <h3 className="flex items-center mb-1 text-lg font-semibold">
                            Status Determination
                          </h3>
                          <p className="text-base font-normal text-muted-foreground">
                            Each variant's metafields are set based on inventory, discontinuation, etc.
                          </p>
                          <ChevronRight className="h-5 w-5 text-muted-foreground my-1 ml-2" />
                        </li>
                        
                        <li className="ml-6">
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-4 ring-white dark:ring-gray-900">
                            4
                          </span>
                          <h3 className="flex items-center mb-1 text-lg font-semibold">
                            UI Update
                          </h3>
                          <p className="text-base font-normal text-muted-foreground">
                            Updated product data is reflected in the UI via the ProductContext
                          </p>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integration" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration APIs</CardTitle>
                    <CardDescription>
                      Documentation for integrating with the PreProduct platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">API Endpoints</h3>
                      <p className="text-muted-foreground mb-4">
                        When integrating with Gadget.dev, the following API endpoints should be created:
                      </p>
                      
                      <Table>
                        <TableCaption>PreProduct API Endpoints</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Endpoint</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">/api/products</TableCell>
                            <TableCell>GET</TableCell>
                            <TableCell>Retrieve all products with PreProduct metadata</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">/api/products/:id</TableCell>
                            <TableCell>GET</TableCell>
                            <TableCell>Retrieve a specific product with its variant data</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">/api/products/:id/process</TableCell>
                            <TableCell>POST</TableCell>
                            <TableCell>Trigger PreProduct logic processing on a specific product</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">/api/products/:id/variants/:variantId</TableCell>
                            <TableCell>PUT</TableCell>
                            <TableCell>Update a specific variant's data</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">/api/store/connect</TableCell>
                            <TableCell>POST</TableCell>
                            <TableCell>Connect a Shopify store to the PreProduct platform</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Authentication</h3>
                      <p className="text-muted-foreground">
                        All API requests should be authenticated using the PreProduct API key, which should be 
                        passed in the Authorization header:
                      </p>
                      
                      <div className="p-3 bg-muted rounded-md my-3 font-mono text-sm overflow-x-auto">
                        Authorization: Bearer pp_api_xxxxxxxxxxxxx
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gadget" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Gadget.dev Integration Guide</CardTitle>
                    <CardDescription>
                      Steps for transferring this application to Gadget.dev
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Migration Steps</h3>
                      <ol className="space-y-4">
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              1
                            </div>
                            <div>
                              <h4 className="font-medium">Set Up Gadget.dev Project</h4>
                              <p className="text-sm text-muted-foreground">
                                Create a new Gadget.dev project and configure the Shopify connection.
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              2
                            </div>
                            <div>
                              <h4 className="font-medium">Define Data Models</h4>
                              <p className="text-sm text-muted-foreground">
                                Create the Product and ProductVariant models in Gadget.dev based on our TypeScript interfaces.
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                The full type definitions can be found in <code>src/contexts/product/types.ts</code>
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              3
                            </div>
                            <div>
                              <h4 className="font-medium">Implement Business Logic</h4>
                              <p className="text-sm text-muted-foreground">
                                Port the core processing logic from <code>variantProcessor.ts</code> and <code>productProcessors.ts</code>
                                to Gadget.dev actions.
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              4
                            </div>
                            <div>
                              <h4 className="font-medium">Set Up API Endpoints</h4>
                              <p className="text-sm text-muted-foreground">
                                Configure the necessary API endpoints as detailed in the Integration APIs section.
                              </p>
                            </div>
                          </div>
                        </li>
                        
                        <li className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              5
                            </div>
                            <div>
                              <h4 className="font-medium">Connect Frontend</h4>
                              <p className="text-sm text-muted-foreground">
                                Update the frontend application to use the Gadget.dev API endpoints instead of the current
                                simulation-based approach.
                              </p>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Gadget.dev-Specific Considerations</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Use Gadget.dev's Shopify connection to sync product data automatically
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Implement the PreProduct processing logic as a scheduled action that runs at regular intervals
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Leverage Gadget.dev's authentication system for API security
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Use Gadget.dev's webhooks to trigger processing when products or inventory changes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="data-models" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Models</CardTitle>
                    <CardDescription>
                      Detailed documentation of the data structures used in PreProduct
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Product Model</h3>
                      <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
{`interface Product {
  id: string;
  title: string;
  variants: ProductVariant[];
  tags: string[];
  auto_quickbuydisable: 'yes' | 'no';
  lastProcessed?: string;
  processingLog?: string[];
}`}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Field Descriptions</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Field</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>id</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>Unique identifier for the product</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>title</TableCell>
                              <TableCell>string</TableCell>
                              <TableCell>Product title</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>variants</TableCell>
                              <TableCell>ProductVariant[]</TableCell>
                              <TableCell>Array of product variants</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>tags</TableCell>
                              <TableCell>string[]</TableCell>
                              <TableCell>Array of tags applied to the product</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>auto_quickbuydisable</TableCell>
                              <TableCell>'yes' | 'no'</TableCell>
                              <TableCell>Whether quick buy is disabled for this product</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>lastProcessed</TableCell>
                              <TableCell>string (optional)</TableCell>
                              <TableCell>ISO timestamp of when the product was last processed</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>processingLog</TableCell>
                              <TableCell>string[] (optional)</TableCell>
                              <TableCell>Log of processing events for debugging</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">ProductVariant Model</h3>
                      <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
{`interface ProductVariant {
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
    auto_preproduct_disablebutton: 'yes' | 'no';
    'custom.discontinued': DiscontinuedValue;
    'custom.ordering_min_qty': number;
  };
  backorderWeeks: number;
  status?: 'active' | 'inactive' | 'pending' | 'error';
  statusMessage?: string;
  lastUpdated?: string;
  processingHistory?: string[];
}`}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Key Metafields</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          The metafields are the core of the PreProduct logic. They determine how a product
                          is displayed and behaves on the storefront:
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">preorder</div>
                            <span className="text-sm text-muted-foreground">
                              Products that have never had stock before
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">preorder_launch</div>
                            <span className="text-sm text-muted-foreground">
                              Products with a future launch date
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">preorder_specialorder</div>
                            <span className="text-sm text-muted-foreground">
                              Products that are specially ordered from the manufacturer
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs">preorder_backorder</div>
                            <span className="text-sm text-muted-foreground">
                              Products that are temporarily out of stock
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-pink-100 text-pink-800 rounded text-xs">preorder_notifyme</div>
                            <span className="text-sm text-muted-foreground">
                              Products that have been in backorder for 4+ weeks
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">preorder_discontinued</div>
                            <span className="text-sm text-muted-foreground">
                              Products that have been discontinued
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <GadgetTransferGuide />
      
      <Footer />
    </div>
  );
};

export default Documentation;
</lov-code>
