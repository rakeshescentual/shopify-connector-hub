
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Key, Save, Plus, Trash2, RotateCcw, Server } from 'lucide-react';

const GadgetEnvironmentDemo = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState('development');
  const [apiKeys, setApiKeys] = useState({
    development: [
      { key: 'SHOPIFY_API_KEY', value: '●●●●●●●●●●●●●●●●', isSecret: true, isVisible: false },
      { key: 'PREPRODUCT_URL', value: 'https://dev-api.preproduct.com', isSecret: false, isVisible: true }
    ],
    production: [
      { key: 'SHOPIFY_API_KEY', value: '●●●●●●●●●●●●●●●●', isSecret: true, isVisible: false },
      { key: 'PREPRODUCT_URL', value: 'https://api.preproduct.com', isSecret: false, isVisible: true }
    ]
  });
  const [newKey, setNewKey] = useState({ key: '', value: '', isSecret: false });
  
  const toggleVisibility = (index: number) => {
    const updatedKeys = [...apiKeys[tab as keyof typeof apiKeys]];
    updatedKeys[index] = { ...updatedKeys[index], isVisible: !updatedKeys[index].isVisible };
    
    setApiKeys({
      ...apiKeys,
      [tab]: updatedKeys
    });
  };
  
  const handleDelete = (index: number) => {
    const updatedKeys = [...apiKeys[tab as keyof typeof apiKeys]];
    updatedKeys.splice(index, 1);
    
    setApiKeys({
      ...apiKeys,
      [tab]: updatedKeys
    });
    
    toast({
      title: "Environment Variable Deleted",
      description: "The environment variable has been removed.",
      variant: "default",
    });
  };
  
  const handleAdd = () => {
    if (!newKey.key || !newKey.value) {
      toast({
        title: "Validation Error",
        description: "Both key and value are required.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedKeys = [...apiKeys[tab as keyof typeof apiKeys]];
    updatedKeys.push({
      key: newKey.key,
      value: newKey.value,
      isSecret: newKey.isSecret,
      isVisible: !newKey.isSecret
    });
    
    setApiKeys({
      ...apiKeys,
      [tab]: updatedKeys
    });
    
    setNewKey({ key: '', value: '', isSecret: false });
    
    toast({
      title: "Environment Variable Added",
      description: `Added ${newKey.key} to ${tab} environment.`,
      variant: "default",
    });
  };
  
  const handleRotateSecret = (index: number) => {
    const updatedKeys = [...apiKeys[tab as keyof typeof apiKeys]];
    // In a real app, we'd generate a new secret here
    updatedKeys[index] = { 
      ...updatedKeys[index], 
      value: '●●●●●●●●●●●●●●●●', 
      isVisible: false 
    };
    
    setApiKeys({
      ...apiKeys,
      [tab]: updatedKeys
    });
    
    toast({
      title: "Secret Rotated",
      description: `The secret for ${updatedKeys[index].key} has been rotated.`,
      variant: "default",
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <CardTitle className="text-md">Gadget Environment Variables</CardTitle>
        </div>
        <CardDescription>
          Manage environment-specific configuration with Gadget.dev's enhanced environment variables
        </CardDescription>
      </CardHeader>
      
      <Tabs value={tab} onValueChange={setTab}>
        <div className="px-6 pt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="development" className="pt-4">
          <CardContent>
            <div className="space-y-4">
              {apiKeys.development.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <Label className="text-xs">{item.key}</Label>
                  </div>
                  <div className="col-span-5 relative">
                    <Input 
                      value={item.isSecret && !item.isVisible ? '●●●●●●●●●●●●●●●●' : item.value}
                      readOnly
                      className="font-mono text-xs"
                    />
                    {item.isSecret && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        onClick={() => toggleVisibility(index)}
                      >
                        {item.isVisible ? 
                          <EyeOff className="h-3.5 w-3.5" /> : 
                          <Eye className="h-3.5 w-3.5" />
                        }
                      </Button>
                    )}
                  </div>
                  <div className="col-span-3 flex gap-1">
                    {item.isSecret && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleRotateSecret(index)}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t my-4 pt-4">
              <h4 className="text-sm font-medium mb-3">Add New Variable</h4>
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label htmlFor="key" className="text-xs">Key</Label>
                  <Input 
                    id="key"
                    value={newKey.key}
                    onChange={(e) => setNewKey({...newKey, key: e.target.value.toUpperCase()})}
                    placeholder="VARIABLE_NAME"
                    className="text-xs"
                  />
                </div>
                <div className="col-span-5">
                  <Label htmlFor="value" className="text-xs">Value</Label>
                  <Input 
                    id="value"
                    value={newKey.value}
                    onChange={(e) => setNewKey({...newKey, value: e.target.value})}
                    placeholder="variable_value"
                    className="text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <Select 
                    value={newKey.isSecret ? "secret" : "plain"}
                    onValueChange={(v) => setNewKey({...newKey, isSecret: v === "secret"})}
                  >
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plain">Plain</SelectItem>
                      <SelectItem value="secret">Secret</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Button onClick={handleAdd} size="sm" className="h-8 w-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="production" className="pt-4">
          <CardContent>
            <div className="space-y-4">
              {apiKeys.production.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <Label className="text-xs">{item.key}</Label>
                  </div>
                  <div className="col-span-5 relative">
                    <Input 
                      value={item.isSecret && !item.isVisible ? '●●●●●●●●●●●●●●●●' : item.value}
                      readOnly
                      className="font-mono text-xs"
                    />
                    {item.isSecret && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        onClick={() => toggleVisibility(index)}
                      >
                        {item.isVisible ? 
                          <EyeOff className="h-3.5 w-3.5" /> : 
                          <Eye className="h-3.5 w-3.5" />
                        }
                      </Button>
                    )}
                  </div>
                  <div className="col-span-3 flex gap-1">
                    {item.isSecret && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleRotateSecret(index)}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="bg-muted/10 border-t">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Server className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-xs text-muted-foreground">
              Enhanced with Gadget.dev's Environment Variables
            </span>
          </div>
          
          <Button size="sm" className="gap-1">
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GadgetEnvironmentDemo;
