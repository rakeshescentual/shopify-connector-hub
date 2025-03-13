
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GadgetFeatures from './gadget/GadgetFeatures';
import GadgetMigrationSteps from './gadget/GadgetMigrationSteps';

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

          <GadgetFeatures />
          
          <Separator />
          
          <GadgetMigrationSteps />
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Advanced Gadget.dev Integration</h3>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Code className="h-4 w-4 text-primary mr-2" />
                  TypeScript Integration
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Leverage Gadget's improved TypeScript support with auto-generated types:
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`// Example of using Gadget.dev's auto-generated types
import { api, models } from "@gadgetinc/api-client-{app}";

// Type-safe model operations with enhanced validation
async function fetchProducts(): Promise<models.Product[]> {
  const response = await api.product.findMany({
    select: {
      id: true,
      title: true,
      variants: {
        select: {
          id: true,
          inventory: true,
          metafields: true
        }
      }
    }
  });
  
  return response.data;
}`}
                </pre>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Code className="h-4 w-4 text-primary mr-2" />
                  GraphQL API Integration
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Implement efficient data fetching with Gadget's GraphQL API:
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`// Example of using Gadget.dev's GraphQL API
import { gql } from "@gadgetinc/api-client-{app}";

const GET_PRODUCTS = gql\`
  query GetProducts($status: String) {
    products(filter: { status: { equals: $status } }) {
      nodes {
        id
        title
        status
        variants {
          nodes {
            id
            sku
            inventoryQuantity
            status
          }
        }
      }
    }
  }
\`;

// Use with React Query
const { data, isLoading } = useQuery({
  queryKey: ['products', status],
  queryFn: async () => {
    const result = await api.query(GET_PRODUCTS, { 
      variables: { status } 
    });
    return result.data.products.nodes;
  }
});`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GadgetTransferGuide;
