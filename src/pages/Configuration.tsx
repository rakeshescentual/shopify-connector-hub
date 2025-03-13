
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GadgetEnvironmentDemo from '@/components/gadget/GadgetEnvironmentDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Configuration = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Configuration & Environment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your Gadget.dev environment variables and application settings
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Alert className="mb-8 border-blue-100 bg-blue-50">
              <Server className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Gadget.dev Integration</AlertTitle>
              <AlertDescription className="text-blue-700">
                This page demonstrates how to use Gadget.dev's Environment Variables feature to 
                manage configuration across development and production environments.
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="environment" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="environment" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" /> Environment Variables
                </TabsTrigger>
                <TabsTrigger value="connections" className="flex items-center gap-1">
                  <Database className="h-4 w-4" /> Connections
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="environment" className="mt-4">
                <GadgetEnvironmentDemo />
              </TabsContent>
              
              <TabsContent value="connections" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Connections</CardTitle>
                    <CardDescription>
                      Manage connections to external services like Shopify
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      This tab would contain configuration for Gadget.dev's Connection Management features.
                      Typically includes Shopify store connections, webhooks, and API integration settings.
                    </p>
                    
                    <div className="p-8 border rounded-md flex items-center justify-center text-muted-foreground">
                      Connection management interface would render here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Configuration;
