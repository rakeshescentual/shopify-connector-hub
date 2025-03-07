
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GadgetTransferGuide from '@/components/GadgetTransferGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, Database, FileText, Layout, Server, Shield } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Developer Documentation</h1>
          <p className="text-muted-foreground mb-8">
            Comprehensive technical documentation for integrating with the PreProduct platform
            and transferring the application to Gadget.dev.
          </p>
          
          <Tabs defaultValue="architecture" className="w-full">
            <TabsList className="w-full mb-8">
              <TabsTrigger value="architecture" className="flex items-center gap-2">
                <Layout size={16} />
                Architecture
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Server size={16} />
                API Reference
              </TabsTrigger>
              <TabsTrigger value="data-model" className="flex items-center gap-2">
                <Database size={16} />
                Data Model
              </TabsTrigger>
              <TabsTrigger value="gadget" className="flex items-center gap-2">
                <Code size={16} />
                Gadget Transfer
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield size={16} />
                Security & Compliance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="architecture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Architecture</CardTitle>
                  <CardDescription>
                    Overview of the application's structure and components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Core Components</h3>
                  <p className="text-sm text-muted-foreground">
                    The PreProduct integration platform follows a modular architecture with separation of concerns between
                    business logic, UI components, and data processing. Below is a breakdown of the major components:
                  </p>
                  
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-medium">1. Product Context</h4>
                      <p className="text-sm text-muted-foreground">
                        The product context provides a centralized state management system for handling product data
                        and processing business logic.
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                        <li>Located in <code>/contexts/ProductContext.tsx</code></li>
                        <li>Provides global access to product data</li>
                        <li>Manages product status computation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">2. Processing Logic</h4>
                      <p className="text-sm text-muted-foreground">
                        The core business logic is encapsulated in processing modules that handle the variant state transitions
                        and product status determination.
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                        <li><code>variantProcessor.ts</code>: Handles individual variant processing</li>
                        <li><code>preProductLogic.ts</code>: Applies business rules to determine product status</li>
                        <li><code>productProcessors.ts</code>: Processes overall product state based on variants</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">3. UI Components</h4>
                      <p className="text-sm text-muted-foreground">
                        React components for user interaction and visual representation of product data.
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                        <li>Simulator Interface (<code>/components/ProductSimulator.tsx</code>)</li>
                        <li>Integration Rule Documentation (<code>/components/IntegrationRules.tsx</code>)</li>
                        <li>Shopify Connect Flow (<code>/components/ConnectFlow.tsx</code>)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Flow Diagram</h3>
                  <div className="border p-4 rounded-md bg-muted/30">
                    <pre className="text-xs overflow-auto whitespace-pre">
{`
                   ┌─────────────────┐
                   │                 │
                   │ Shopify Store   │
                   │                 │
                   └────────┬────────┘
                            │
                            ▼
┌───────────────────────────────────────────────┐
│                                               │
│ PreProduct Integration Platform               │
│                                               │
│  ┌─────────────┐    ┌──────────────────┐      │
│  │             │    │                  │      │
│  │  Connect    │───▶│ Product Context  │      │
│  │  Flow       │    │                  │      │
│  │             │    └────────┬─────────┘      │
│  └─────────────┘             │                │
│                              │                │
│  ┌─────────────┐    ┌────────▼─────────┐      │
│  │             │    │                  │      │
│  │  Product    │◀───┤ Variant          │      │
│  │  Simulator  │    │ Processor        │      │
│  │             │    │                  │      │
│  └─────────────┘    └────────┬─────────┘      │
│                              │                │
│  ┌─────────────┐    ┌────────▼─────────┐      │
│  │             │    │                  │      │
│  │  Rules      │    │ PreProduct Logic │      │
│  │  Docs       │    │                  │      │
│  │             │    └──────────────────┘      │
│  └─────────────┘                              │
│                                               │
└───────────────────────────────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │                 │
                   │   Gadget.dev    │
                   │                 │
                   └─────────────────┘
`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                  <CardDescription>
                    Core technologies used in the application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mr-2">Frontend</span>
                      <div>
                        <span className="font-medium">React + TypeScript</span>
                        <p className="text-sm text-muted-foreground">Core application framework with type safety</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mr-2">State Management</span>
                      <div>
                        <span className="font-medium">React Context API</span>
                        <p className="text-sm text-muted-foreground">For global state and product data management</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mr-2">Styling</span>
                      <div>
                        <span className="font-medium">Tailwind CSS + shadcn/ui</span>
                        <p className="text-sm text-muted-foreground">For responsive and accessible UI components</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mr-2">Data Fetching</span>
                      <div>
                        <span className="font-medium">TanStack Query</span>
                        <p className="text-sm text-muted-foreground">For efficient API data fetching and caching</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Documentation for the PreProduct Integration API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Base URL</h3>
                    <p className="text-sm text-muted-foreground">
                      All API endpoints are relative to:
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-xs mt-2">https://api.preproduct.com/v1</pre>
                    <p className="text-sm text-muted-foreground mt-2">
                      When migrating to Gadget.dev, the base URL will change to your Gadget application URL.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      All requests require an API key to be passed in the headers:
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-xs mt-2">
{`
// Required Headers
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
`}
                    </pre>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Endpoints</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span>
                        <code className="text-sm">/products</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieves a list of products with their PreProduct status information.
                      </p>
                      <div className="bg-muted p-2 rounded-md text-xs mt-2">
                        <p className="font-medium">Query Parameters:</p>
                        <ul className="pl-4 mt-1 space-y-1">
                          <li><code>status</code> - Filter by product status (optional)</li>
                          <li><code>limit</code> - Number of results to return (default: 20)</li>
                          <li><code>offset</code> - Pagination offset (default: 0)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span>
                        <code className="text-sm">/products/:id</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieves a single product by ID with detailed variant information.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span>
                        <code className="text-sm">/products/:id/process</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Processes a product through the PreProduct logic and returns the updated status.
                      </p>
                      <div className="bg-muted p-2 rounded-md text-xs mt-2">
<pre>{`
// Request Body
{
  "includeInventory": true,
  "applyTags": true
}

// Response
{
  "id": "product_123",
  "status": "preorder",
  "variants": [...],
  "tags": ["preorder", "launch-date-june-2023"],
  "quickBuyDisabled": false
}
`}</pre>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span>
                        <code className="text-sm">/shopify/connect</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Establishes connection with a Shopify store.
                      </p>
                      <div className="bg-muted p-2 rounded-md text-xs mt-2">
<pre>{`
// Request Body
{
  "shopDomain": "your-store.myshopify.com",
  "apiKey": "your_preproduct_api_key"
}
`}</pre>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span>
                        <code className="text-sm">/shopify/sync</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Triggers a sync of products from Shopify to PreProduct.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="data-model" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Model</CardTitle>
                  <CardDescription>
                    Core data structures used in the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Product</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The main product entity with variants and status information.
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-xs">
{`
interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  status: ProductStatus;
  tags: string[];
  variants: Variant[];
  options: ProductOption[];
  images: Image[];
  quickBuyDisabled: boolean;
  metafields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

type ProductStatus = 
  | 'active'       // Regular product with available inventory
  | 'preorder'     // Product available for pre-order
  | 'backorder'    // Temporarily out of stock
  | 'discontinued' // No longer available
  | 'notify'       // Email when available
  | 'coming-soon'  // Not yet available for purchase
`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Variant</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Product variant details including inventory and status.
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-xs">
{`
interface Variant {
  id: string;
  productId: string;
  title: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  inventoryQuantity: number;
  inventoryPolicy: 'deny' | 'continue';
  inventoryManagement: 'shopify' | 'not_managed';
  requiresShipping: boolean;
  weight: number;
  weightUnit: 'kg' | 'g' | 'lb' | 'oz';
  options: OptionValue[];
  barcode: string | null;
  discontinued: boolean;
  launchDate: string | null;
  backorderDelay: number | null; // in weeks
  status: VariantStatus;
  metafields: Record<string, any>;
}

type VariantStatus = 
  | 'in-stock'
  | 'out-of-stock'
  | 'low-stock'
  | 'backorder'
  | 'preorder'
  | 'discontinued'
  | 'special-order'
  | 'notify-me'
`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Store Connection</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Shopify store connection details.
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-xs">
{`
interface StoreConnection {
  id: string;
  shopDomain: string;
  accessToken: string; // Encrypted in storage
  syncSettings: {
    autoSync: boolean;
    syncInterval: 'hourly' | 'daily' | 'weekly' | 'manual';
    includeDrafts: boolean;
    includeOutOfStock: boolean;
    syncImages: boolean;
    syncMetafields: boolean;
    enableWebhooks: boolean;
    notifyOnSync: boolean;
  };
  lastSyncedAt: string | null;
  status: 'active' | 'disconnected' | 'error';
  createdAt: string;
  updatedAt: string;
}
`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gadget" className="space-y-6">
              <GadgetTransferGuide />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                  <CardDescription>
                    Security features and compliance with Shopify requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Shopify Security Requirements</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The PreProduct integration platform follows all Shopify security best practices
                      and meets the requirements for Built for Shopify certification.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Secure API Authentication</span>
                          <p className="text-xs text-muted-foreground">
                            Implements OAuth 2.0 for Shopify API authentication and secure token storage.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Data Encryption</span>
                          <p className="text-xs text-muted-foreground">
                            All sensitive data is encrypted at rest and in transit.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Minimal Permissions</span>
                          <p className="text-xs text-muted-foreground">
                            Requests only the minimum required Shopify API scopes needed for functionality.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Webhook Verification</span>
                          <p className="text-xs text-muted-foreground">
                            Implements HMAC verification for all incoming Shopify webhooks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Shopify Plus Certification Compliance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The application is designed to meet all requirements for Shopify Plus certification.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium text-sm mb-2">Performance Requirements</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Optimized API calls with rate limiting compliance</li>
                          <li>• Efficient data processing with minimal impact on store</li>
                          <li>• Background processing for sync operations</li>
                        </ul>
                      </div>
                      
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium text-sm mb-2">Reliability & Scalability</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Comprehensive error handling and recovery</li>
                          <li>• Auto-retry logic for transient failures</li>
                          <li>• Load balancing and high availability architecture</li>
                        </ul>
                      </div>
                      
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium text-sm mb-2">Security & Privacy</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• GDPR & CCPA compliant data processing</li>
                          <li>• Secure storage of merchant data</li>
                          <li>• Regular security assessments and penetration testing</li>
                        </ul>
                      </div>
                      
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium text-sm mb-2">Support & Documentation</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Comprehensive technical documentation</li>
                          <li>• Merchant-focused user guides</li>
                          <li>• Dedicated support team for Plus merchants</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
