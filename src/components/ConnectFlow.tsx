
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Store, LinkIcon, Check, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface StepProps {
  title: string;
  description: string;
  active: boolean;
  completed: boolean;
  number: number;
}

const StepIndicator: React.FC<StepProps> = ({ title, description, active, completed, number }) => {
  return (
    <div className="flex items-start space-x-4 mb-8">
      <div 
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
          completed ? 'bg-primary border-primary text-white' : 
          active ? 'border-primary text-primary' : 'border-gray-300 text-gray-400'
        }`}
      >
        {completed ? <Check size={18} /> : number}
      </div>
      <div>
        <h3 className={`font-medium transition-colors ${active || completed ? 'text-black' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

const ConnectFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shopifyUrl, setShopifyUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    if (!shopifyUrl) {
      toast({
        title: "Error",
        description: "Please enter your Shopify store URL",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your PreProduct API key",
        variant: "destructive",
      });
      return;
    }

    setConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setCurrentStep(3);
      toast({
        title: "Success",
        description: "Your store has been successfully connected to PreProduct!",
      });
    }, 2000);
  };

  return (
    <section id="connect" className="py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect Your Store</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to connect your Shopify store to the PreProduct testing platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <StepIndicator 
                title="Enter Store Details" 
                description="Provide your Shopify store URL" 
                active={currentStep === 1} 
                completed={currentStep > 1}
                number={1}
              />
              <StepIndicator 
                title="Connect APIs" 
                description="Enter your PreProduct API credentials" 
                active={currentStep === 2} 
                completed={currentStep > 2}
                number={2}
              />
              <StepIndicator 
                title="Confirmation" 
                description="Verify the connection is working" 
                active={currentStep === 3} 
                completed={false}
                number={3}
              />
            </div>
            
            {connected && (
              <Card className="border-green-100 bg-green-50/50 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check size={20} />
                    <p className="font-medium">Successfully Connected</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Your Escentual Shopify store is now connected to PreProduct.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-8">
            <Card className="glass-card shadow-lg animate-fade-in overflow-hidden">
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                  Set up the connection between your Shopify store and PreProduct
                </CardDescription>
              </CardHeader>
              
              <Tabs value={currentStep.toString()} onValueChange={(v) => setCurrentStep(parseInt(v))}>
                <TabsList className="grid w-full grid-cols-3 mb-6 mx-6">
                  <TabsTrigger value="1" disabled={currentStep < 1}>Store Details</TabsTrigger>
                  <TabsTrigger value="2" disabled={currentStep < 2}>API Connection</TabsTrigger>
                  <TabsTrigger value="3" disabled={currentStep < 3}>Confirmation</TabsTrigger>
                </TabsList>
                
                <CardContent>
                  <TabsContent value="1" className="space-y-6 mt-0">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="store-url" className="text-sm font-medium block mb-1.5">
                          Shopify Store URL
                        </label>
                        <div className="flex items-center relative">
                          <Store size={16} className="absolute left-3 text-gray-500" />
                          <Input 
                            id="store-url"
                            className="pl-10"
                            placeholder="escentual.myshopify.com"
                            value={shopifyUrl}
                            onChange={(e) => setShopifyUrl(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">
                          Enter the URL of your Shopify store (without https://)
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="2" className="space-y-6 mt-0">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="api-key" className="text-sm font-medium block mb-1.5">
                          PreProduct API Key
                        </label>
                        <div className="flex items-center relative">
                          <LinkIcon size={16} className="absolute left-3 text-gray-500" />
                          <Input 
                            id="api-key"
                            className="pl-10"
                            placeholder="pp_api_xxxxxxxxxxxxx"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type="password"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">
                          You can find your API key in the PreProduct dashboard settings
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="3" className="mt-0">
                    <div className="text-center py-8">
                      {connected ? (
                        <div className="space-y-4 animate-fade-in">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Check size={32} className="text-green-600" />
                          </div>
                          <h3 className="text-xl font-semibold">Connection Successful!</h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Your Shopify store is now connected to PreProduct. You can now start
                            using all the features to test and gather feedback on your products.
                          </p>
                          <Button className="mt-4 rounded-full">
                            Go to Dashboard <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4 animate-fade-in">
                          <p className="text-gray-600">
                            Please complete the previous steps to connect your store.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t p-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1 || connecting}
                  >
                    Back
                  </Button>
                  {currentStep < 3 ? (
                    <Button 
                      onClick={() => {
                        if (currentStep === 2) {
                          handleConnect();
                        } else {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                      disabled={connecting || (currentStep === 1 && !shopifyUrl) || (currentStep === 2 && (!shopifyUrl || !apiKey))}
                    >
                      {connecting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : currentStep === 2 ? 'Connect' : 'Next'}
                    </Button>
                  ) : null}
                </CardFooter>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectFlow;
