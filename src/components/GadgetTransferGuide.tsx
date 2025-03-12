
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Check, Code, ExternalLink, Star, Zap, Sparkles } from 'lucide-react';

const GadgetTransferGuide = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gadget.dev Migration Guide</CardTitle>
              <CardDescription>
                Complete guide for transferring this application to Gadget.dev
              </CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Code size={12} />
              Gadget.dev Ready
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Migration Preparation</AlertTitle>
            <AlertDescription>
              This application is architected to be Gadget.dev compatible. Follow these steps for a smooth migration.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="text-lg font-medium mb-2">Latest Gadget.dev Features</h3>
            <div className="bg-primary/5 border border-primary/10 rounded-md p-4 mb-6">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Improved Effect Builder</span> - Enhanced effect builder with better real-time validation and error handling capabilities
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Field-Level Permissions</span> - More granular control over field-level access for different user roles
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Environment Variables</span> - Enhanced environment variable management with secret handling
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">TypeScript Improvements</span> - Better TypeScript integration with automatic type generation
                  </div>
                </li>
              </ul>
            </div>
          
            <h3 className="text-lg font-medium mb-4">Migration Steps</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-base">Create Gadget Project</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a new Gadget.dev project and connect it to your Shopify store.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <ol className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Sign in to Gadget.dev and create a new project</li>
                      <li>Select "Shopify" as your app type</li>
                      <li>Configure your app name and settings</li>
                      <li>Install the Shopify connection</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-base">Create Data Models</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set up the core data models in Gadget based on our TypeScript interfaces.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <p className="text-xs text-muted-foreground mb-2">
                      Create the following models in Gadget.dev:
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>
                        <span className="font-medium">Product</span> - with the standard Shopify fields plus
                        custom fields for PreProduct status
                      </li>
                      <li>
                        <span className="font-medium">ProductVariant</span> - with additional fields for discontinued, 
                        launchDate, backorderDelay, status
                      </li>
                      <li>
                        <span className="font-medium">StoreConnection</span> - for storing connection settings
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2 border border-green-100 bg-green-50 rounded-md p-2 flex items-start">
                    <Star className="text-amber-500 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-800">
                      Leverage Gadget's new Field-Level Permissions to control access to sensitive fields like API keys.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-base">Implement Core Logic</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Port the processing logic into Gadget actions and effects.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>
                        Create a <code>processVariant</code> action on the ProductVariant model
                        that implements the logic from <code>variantProcessor.ts</code>
                      </li>
                      <li>
                        Create a <code>applyPreProductLogic</code> action on the Product model
                        that implements the logic from <code>preProductLogic.ts</code>
                      </li>
                      <li>
                        Set up an Effect that runs whenever product inventory changes to
                        automatically update the PreProduct status
                      </li>
                    </ul>
                  </div>
                  <div className="border border-amber-100 bg-amber-50 rounded-md p-2 mt-3 flex items-start">
                    <Zap className="text-amber-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      Use Gadget's improved Effect Builder with enhanced validation to ensure your effects fire correctly when inventory changes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-base">Set Up API Endpoints</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create Gadget API endpoints that match the simulation application.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>
                        Configure Gadget's built-in RESTful API for Product and ProductVariant models
                      </li>
                      <li>
                        Create a custom API route for <code>/shopify/connect</code> that handles store connections
                      </li>
                      <li>
                        Create a custom API route for <code>/shopify/sync</code> that triggers product synchronization
                      </li>
                      <li>
                        Set up appropriate authentication and rate limiting for all endpoints
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-medium text-base">Frontend Integration</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update the frontend to use the Gadget API endpoints and leverage the JavaScript client.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>
                        Use Gadget's JavaScript client with automatic TypeScript type generation
                      </li>
                      <li>
                        Update API call paths in the simulator to point to your Gadget app
                      </li>
                      <li>
                        Implement OAuth flow for merchant installation using Gadget's built-in auth
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <a 
                        href="https://docs.gadget.dev/guides/using-gadget-with-react" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Gadget React Guide <ExternalLink size={12} />
                      </a>
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <a 
                        href="https://docs.gadget.dev/api/client" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Gadget JS Client <ExternalLink size={12} />
                      </a>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Key Gadget.dev Features to Utilize</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Connections</h4>
                <p className="text-xs text-muted-foreground">
                  Use Gadget's built-in Shopify connection to handle authentication, API access, and webhooks automatically.
                </p>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Actions</h4>
                <p className="text-xs text-muted-foreground">
                  Implement the PreProduct logic as Gadget actions to encapsulate business logic with proper validation.
                </p>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Effects</h4>
                <p className="text-xs text-muted-foreground">
                  Use Effects with the improved Effect Builder to automatically trigger PreProduct processing when product data changes.
                </p>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Global State</h4>
                <p className="text-xs text-muted-foreground">
                  Store configuration settings using Gadget's Global State feature for app-wide settings.
                </p>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Environment Variables</h4>
                <p className="text-xs text-muted-foreground">
                  Use Gadget's enhanced environment variables system for API keys with proper secret management.
                </p>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-primary/5 transition-colors">
                <h4 className="font-medium text-sm mb-2">Field-Level Permissions</h4>
                <p className="text-xs text-muted-foreground">
                  Implement granular field-level access control using Gadget's new permission system.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Advanced Gadget.dev Integration</h3>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  TypeScript Integration
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Leverage Gadget's improved TypeScript support for auto-generated types:
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`// Example of using Gadget.dev's auto-generated types
import { api, models } from "./gadget";

// Type-safe model operations
async function fetchProducts(): Promise<models.Product[]> {
  const products = await api.product.findMany();
  return products;
}`}
                </pre>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  Effect Integration
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Configure product status updates using Gadget's Effect system:
                </p>
                <div className="bg-muted p-2 rounded text-xs">
                  <p className="mb-1">1. Create an Effect that triggers on ProductVariant inventory changes</p>
                  <p className="mb-1">2. Call the <code>processVariant</code> action with the updated inventory data</p>
                  <p className="mb-1">3. Run the <code>applyPreProductLogic</code> action on the parent Product</p>
                  <p>4. Set appropriate conditions to prevent infinite loops</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GadgetTransferGuide;
