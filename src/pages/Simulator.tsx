
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductSimulator from '@/components/ProductSimulator';
import { Cpu, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
