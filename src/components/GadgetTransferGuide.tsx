
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Steps, Step } from '@/components/ui/steps';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';

const GadgetTransferGuide = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Transfer Guide</Badge>
            <h2 className="text-3xl font-bold mb-4">Migrating to Gadget.dev</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow this step-by-step guide to transfer the PreProduct application to the Gadget.dev platform
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Migration Process</CardTitle>
              <CardDescription>
                Complete these steps to successfully transfer the application
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-10">
                <Step number={1} title="Export Data Models">
                  <p className="text-muted-foreground mb-4">
                    Begin by exporting the TypeScript interfaces that define the data models used in PreProduct.
                  </p>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Export <code>Product</code> interface from <code>src/contexts/product/types.ts</code></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Export <code>ProductVariant</code> interface from <code>src/contexts/product/types.ts</code></p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Data Models
                  </Button>
                </Step>
                
                <Step number={2} title="Create Gadget.dev Models">
                  <p className="text-muted-foreground mb-4">
                    Create the corresponding models in Gadget.dev's data modeling interface.
                  </p>
                  <div className="p-4 bg-muted rounded-md mb-4">
                    <h4 className="font-medium mb-2 text-sm">Key Fields to Include:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>All product fields (id, title, tags, etc.)</li>
                      <li>All variant fields (id, title, inventory, etc.)</li>
                      <li>All metafields with their exact names</li>
                      <li>Processing status and history fields</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href="https://gadget.dev/docs/modeling" target="_blank" rel="noopener noreferrer">
                      View Gadget.dev Modeling Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </Step>
                
                <Step number={3} title="Implement Business Logic">
                  <p className="text-muted-foreground mb-4">
                    Transfer the core processing logic to Gadget.dev actions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium text-sm mb-1">Source Files</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>src/contexts/product/variantProcessor.ts</li>
                        <li>src/contexts/product/productProcessors.ts</li>
                        <li>src/contexts/product/preProductLogic.ts</li>
                      </ul>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium text-sm mb-1">Gadget.dev Actions</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>processProductVariant</li>
                        <li>updateProductTags</li>
                        <li>applyPreProductLogic</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href="https://gadget.dev/docs/actions" target="_blank" rel="noopener noreferrer">
                      View Gadget.dev Actions Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </Step>
                
                <Step number={4} title="Configure Shopify Integration">
                  <p className="text-muted-foreground mb-4">
                    Set up the Shopify connection in Gadget.dev to sync product data.
                  </p>
                  <div className="p-4 bg-muted rounded-md mb-4">
                    <h4 className="font-medium mb-2 text-sm">Required Permissions:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Read products</li>
                      <li>Write products</li>
                      <li>Read inventory</li>
                      <li>Write inventory</li>
                      <li>Read/write product metafields</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href="https://gadget.dev/docs/connections/shopify" target="_blank" rel="noopener noreferrer">
                      View Shopify Connection Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </Step>
                
                <Step number={5} title="Set Up API Endpoints">
                  <p className="text-muted-foreground mb-4">
                    Create the necessary API endpoints in Gadget.dev to expose functionality to the frontend.
                  </p>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Create API routes for product processing</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Set up authentication with API keys</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Configure webhooks for real-time updates</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href="https://gadget.dev/docs/api" target="_blank" rel="noopener noreferrer">
                      View API Configuration Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </Step>
                
                <Step number={6} title="Test and Deploy">
                  <p className="text-muted-foreground mb-4">
                    Thoroughly test the application and deploy it to production.
                  </p>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Test API endpoints with sample product data</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Verify processing logic works correctly</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <p className="text-sm">Deploy to production environment</p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    Deploy to Production
                  </Button>
                </Step>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GadgetTransferGuide;

// Helper components for the steps
interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-10">{children}</div>;
};

const Step: React.FC<StepProps> = ({ number, title, children }) => {
  return (
    <div className="relative pl-10 pb-8 border-l border-gray-200 last:border-l-0 last:pb-0">
      <div className="absolute top-0 left-0 -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
        {number}
      </div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="text-sm">{children}</div>
    </div>
  );
};
