
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductSimulator from '@/components/ProductSimulator';
import { Cpu, Info, FileText, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Simulator = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">Product Simulator</h1>
              <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                Interactive
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Test how different product variant configurations affect PreProduct logic and see the
              resulting tags, statuses, and behavior in real-time.
            </p>
            
            <div className="mt-6 flex items-start gap-2 text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/30">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-700 dark:text-blue-300">
                  This simulator helps you understand how the PreProduct app processes your product inventory,
                  discontinued status, and other settings. It's a helpful tool for troubleshooting and planning your
                  product strategy.
                </p>
                <p className="mt-2 text-blue-600 dark:text-blue-400">
                  Start by modifying a variant or creating a new one, then click "Apply PreProduct Logic" to see the results.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1 bg-primary/5"
                asChild
              >
                <a href="#tutorial">
                  <FileText className="h-3 w-3" />
                  View Documentation
                  <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </Button>

              <Tabs defaultValue="overview" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="status-guide">Status Guide</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-3 text-xs bg-card/50 rounded-md mt-2">
                  <h3 className="font-medium mb-1">How PreProduct Logic Works</h3>
                  <p className="text-muted-foreground">
                    The PreProduct app analyzes your product variants and applies specific tags based on inventory,
                    discontinued status, launch dates, and other factors. These tags control how products appear on
                    your storefront.
                  </p>
                </TabsContent>
                
                <TabsContent value="status-guide" className="p-3 text-xs bg-card/50 rounded-md mt-2">
                  <h3 className="font-medium mb-1">Status Priority Order</h3>
                  <ol className="list-decimal pl-4 text-muted-foreground space-y-1">
                    <li>Discontinued (highest priority)</li>
                    <li>Launch Date (pre-orders)</li>
                    <li>Notify Me (backorder &gt;= 4 weeks)</li>
                    <li>Special Order (minimum qty = 1)</li>
                    <li>Backorder (temporary out of stock)</li>
                    <li>Pre-Order (never had stock before)</li>
                  </ol>
                </TabsContent>
                
                <TabsContent value="examples" className="p-3 text-xs bg-card/50 rounded-md mt-2">
                  <h3 className="font-medium mb-1">Common Test Scenarios</h3>
                  <ul className="list-disc pl-4 text-muted-foreground space-y-1">
                    <li>Out of stock discontinued item: Displays "Discontinued"</li>
                    <li>Future launch date: Displays "Pre-Order" with launch date</li>
                    <li>Extended backorder (4+ weeks): Displays "Notify Me"</li>
                    <li>Mixed inventory variants: May disable quick buy</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <Separator className="my-8 max-w-6xl mx-auto" />
          
          <ProductSimulator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Simulator;
