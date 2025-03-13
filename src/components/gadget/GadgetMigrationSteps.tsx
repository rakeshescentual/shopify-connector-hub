
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Zap, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const GadgetMigrationSteps = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Migration Steps</h3>
      
      <div className="space-y-6">
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
                Leverage Gadget's improved Field-Level Permissions to control access to sensitive fields like API keys.
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
                  Set up an Effect with enhanced monitoring that runs whenever product inventory 
                  changes to automatically update the PreProduct status
                </li>
                <li>
                  Create a scheduled job using the Schedule Builder to periodically check 
                  and update product statuses
                </li>
              </ul>
            </div>
            <div className="border border-amber-100 bg-amber-50 rounded-md p-2 mt-3 flex items-start">
              <Zap className="text-amber-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                Use Gadget's improved Effect Builder with enhanced validation and monitoring to ensure your 
                effects fire correctly when inventory changes.
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
                  Use the GraphQL API Builder to create a custom GraphQL API for more efficient queries
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
    </Card>
  );
};

export default GadgetMigrationSteps;
