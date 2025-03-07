
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Check, Code, ExternalLink } from 'lucide-react';

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
                  <div className="border border-green-100 bg-green-50 rounded-md p-2 mt-3 flex items-start">
                    <Check className="text-green-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-800">
                      The processing logic in this app is already structured to be easily ported
                      to Gadget actions with minimal changes needed.
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
                    Update the frontend to use the Gadget API endpoints.
                  </p>
                  <div className="mt-2 bg-muted p-3 rounded-md">
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>
                        Use Gadget's JavaScript client in the frontend application
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
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Connections</h4>
                <p className="text-xs text-muted-foreground">
                  Use Gadget's built-in Shopify connection to handle authentication, API access, and webhooks automatically.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Actions</h4>
                <p className="text-xs text-muted-foreground">
                  Implement the PreProduct logic as Gadget actions to encapsulate business logic with proper validation.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Effects</h4>
                <p className="text-xs text-muted-foreground">
                  Use Effects to automatically trigger PreProduct processing when product data changes.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Global State</h4>
                <p className="text-xs text-muted-foreground">
                  Store configuration settings using Gadget's Global State feature for app-wide settings.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Environment Variables</h4>
                <p className="text-xs text-muted-foreground">
                  Use Gadget's environment variables for API keys and configuration instead of hardcoding.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm mb-2">Role-Based Access</h4>
                <p className="text-xs text-muted-foreground">
                  Implement proper permissions using Gadget's role-based access control for API endpoints.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GadgetTransferGuide;
