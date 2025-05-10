
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProductContext } from '@/contexts/ProductContext';
import { Lightbulb, Database, Code, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ShopifyDevAssistant = () => {
  const { product, selectedVariant } = useProductContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [queryInput, setQueryInput] = useState('');
  const [mockResponses] = useState({
    preorder: [
      "Consider enabling 'Notify Me' for variants with long backorder times (4+ weeks)",
      "Launch Date Pre-orders should display estimated shipping dates on product pages",
      "Add inventory threshold notifications to alert customers of low stock",
      "Set up automated email sequences for pre-order customers"
    ],
    discontinued: [
      "Add 'Similar Products' recommendations for discontinued items",
      "Consider a 'Last Chance' collection for soon-to-be discontinued items",
      "Set up redirects from discontinued product URLs to relevant categories",
      "Implement SEO strategy to maintain traffic from discontinued product pages"
    ],
    inventory: [
      "Set minimum inventory thresholds based on historical sales velocity",
      "Configure backorder messaging to show accurate shipping estimates",
      "Use 'limited quantity' messaging for items with less than 5 units",
      "Consider tiered inventory rules based on product categories"
    ],
    general: [
      "Implement custom metafield schemas for more consistent product data",
      "Use product tags to create dynamic collections for pre-order items",
      "Configure inventory webhooks to update pre-order status automatically",
      "Use the MCP server to test different inventory scenarios"
    ]
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call to Shopify MCP server
    setTimeout(() => {
      let recommendations: string[] = [];
      
      // Generate contextual recommendations based on product state
      if (selectedVariant) {
        const hasPreorderVariants = product.variants.some(v => 
          v.metafields.auto_preproduct_preorder === 'yes' || 
          v.metafields.auto_preproduct_preorder_launch === 'yes'
        );
        
        const hasDiscontinuedVariants = product.variants.some(v => 
          v.metafields.auto_preproduct_preorder_discontinued === 'yes' ||
          v.metafields['custom.discontinued'] !== 'No'
        );
        
        const hasLowInventory = product.variants.some(v => v.inventory < 5 && v.inventory > 0);
        
        if (hasPreorderVariants) {
          recommendations = [...recommendations, ...mockResponses.preorder];
        }
        
        if (hasDiscontinuedVariants) {
          recommendations = [...recommendations, ...mockResponses.discontinued];
        }
        
        if (hasLowInventory) {
          recommendations = [...recommendations, ...mockResponses.inventory];
        }

        if (recommendations.length === 0) {
          recommendations = mockResponses.general;
        }
      } else {
        recommendations = mockResponses.general;
      }
      
      setAiRecommendations(recommendations);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Shopify Dev Assistant has analyzed your product configuration",
      });
    }, 1500);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRecommendations = [
        `Regarding "${queryInput}": Consider using custom metafields to track this information`,
        "The Shopify MCP server can help test this scenario across multiple storefronts",
        "Review Shopify's developer documentation for best practices on implementing this feature"
      ];
      
      setAiRecommendations(newRecommendations);
      setIsAnalyzing(false);
      setQueryInput('');
      
      toast({
        title: "Query Processed",
        description: "The Shopify Dev Assistant has processed your query",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h2 className="text-lg font-medium">Shopify Developer Assistant</h2>
        <Badge variant="outline" className="ml-auto">Beta</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Database className="h-4 w-4 mr-2 text-primary" />
            MCP Server Integration
          </CardTitle>
          <CardDescription>
            Connect to Shopify's Merchant Config Platform to test your PreProduct configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="bg-primary/5 p-3 rounded-md text-sm">
              <p>Analyze your current product configuration to get AI-powered recommendations based on Shopify best practices.</p>
            </div>
            
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Current Configuration"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleQuerySubmit}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Search className="h-4 w-4 mr-2 text-primary" />
              Query the Assistant
            </CardTitle>
            <CardDescription>
              Ask specific questions about implementing PreProduct with Shopify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="E.g., How should I handle discontinued variants in a collection?"
              className="min-h-20"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isAnalyzing || !queryInput.trim()}
              className="w-full"
            >
              {isAnalyzing ? "Processing..." : "Submit Query"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {aiRecommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Code className="h-4 w-4 mr-2 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Based on Shopify's developer documentation and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Powered by Shopify MCP</span>
            <span>Results are simulated for demonstration</span>
          </CardFooter>
        </Card>
      )}

      <div className="pt-4">
        <Separator className="mb-4" />
        <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 border border-blue-100">
          <h3 className="font-medium mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-blue-600" />
            About Shopify Developer Assistant
          </h3>
          <p className="mb-2">
            This integration connects to Shopify's MCP (Merchant Config Platform) server, allowing you to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Test PreProduct configurations across different Shopify themes</li>
            <li>Get AI recommendations based on Shopify best practices</li>
            <li>Validate metafield implementations before deployment</li>
            <li>Simulate how changes affect the storefront UI</li>
          </ul>
          <p className="mt-2 text-xs">
            Note: This is a demonstration of potential integration. To connect to a real Shopify store, 
            you would need to authenticate with your Shopify Partner account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopifyDevAssistant;
