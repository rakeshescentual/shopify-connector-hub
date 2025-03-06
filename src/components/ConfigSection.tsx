
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Database, ShieldCheck, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ConfigSection = () => {
  const [syncing, setSyncing] = useState(false);
  const [settings, setSettings] = useState({
    autoSync: true,
    syncInterval: "hourly",
    includeDrafts: false,
    includeOutOfStock: true,
    enableWebhooks: true,
    notifyOnSync: true,
    syncImages: true,
    syncMetafields: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleSyncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast({
        title: "Sync Complete",
        description: "Products have been successfully synchronized.",
      });
    }, 2000);
  };

  return (
    <section id="config" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Configure Your Connection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize how your Shopify store integrates with the PreProduct platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-none overflow-hidden animate-slide-up">
            <Tabs defaultValue="sync">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Connection Settings</CardTitle>
                  <TabsList>
                    <TabsTrigger value="sync" className="flex items-center">
                      <RefreshCw size={14} className="mr-1.5" />
                      Sync
                    </TabsTrigger>
                    <TabsTrigger value="data" className="flex items-center">
                      <Database size={14} className="mr-1.5" />
                      Data
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center">
                      <ShieldCheck size={14} className="mr-1.5" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="flex items-center">
                      <Settings size={14} className="mr-1.5" />
                      Advanced
                    </TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  Manage how your store data is synchronized and used
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <TabsContent value="sync" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Automatic Sync</h3>
                          <p className="text-sm text-gray-500">Keep products automatically in sync</p>
                        </div>
                        <Switch 
                          checked={settings.autoSync} 
                          onCheckedChange={() => handleToggle('autoSync')} 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Include Draft Products</h3>
                          <p className="text-sm text-gray-500">Sync products that are not published</p>
                        </div>
                        <Switch 
                          checked={settings.includeDrafts} 
                          onCheckedChange={() => handleToggle('includeDrafts')} 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Include Out of Stock</h3>
                          <p className="text-sm text-gray-500">Sync products with zero inventory</p>
                        </div>
                        <Switch 
                          checked={settings.includeOutOfStock} 
                          onCheckedChange={() => handleToggle('includeOutOfStock')} 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sync Product Images</h3>
                          <p className="text-sm text-gray-500">Include product images in sync</p>
                        </div>
                        <Switch 
                          checked={settings.syncImages} 
                          onCheckedChange={() => handleToggle('syncImages')} 
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Sync Interval</label>
                        <Select 
                          value={settings.syncInterval} 
                          onValueChange={(value) => handleChange('syncInterval', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Every hour</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="manual">Manual only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable Webhooks</h3>
                          <p className="text-sm text-gray-500">Update on product changes</p>
                        </div>
                        <Switch 
                          checked={settings.enableWebhooks} 
                          onCheckedChange={() => handleToggle('enableWebhooks')} 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sync Notifications</h3>
                          <p className="text-sm text-gray-500">Get notified when syncs complete</p>
                        </div>
                        <Switch 
                          checked={settings.notifyOnSync} 
                          onCheckedChange={() => handleToggle('notifyOnSync')} 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sync Metafields</h3>
                          <p className="text-sm text-gray-500">Include product metafields in sync</p>
                        </div>
                        <Switch 
                          checked={settings.syncMetafields} 
                          onCheckedChange={() => handleToggle('syncMetafields')} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-between">
                    <Button variant="outline" onClick={handleSyncNow} disabled={syncing}>
                      {syncing ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} className="mr-2" />
                          Sync Now
                        </>
                      )}
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="mt-0 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Data Mapping</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Configure how Shopify product data maps to PreProduct fields
                      </p>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1.5">Product Title</label>
                            <Select defaultValue="title">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="title">Product Title</SelectItem>
                                <SelectItem value="custom">Custom Field</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium block mb-1.5">Product Description</label>
                            <Select defaultValue="description">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="description">Product Description</SelectItem>
                                <SelectItem value="custom">Custom Field</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1.5">Product Category</label>
                            <Select defaultValue="type">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type">Product Type</SelectItem>
                                <SelectItem value="collection">Collection</SelectItem>
                                <SelectItem value="tag">Product Tag</SelectItem>
                                <SelectItem value="metafield">Metafield</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium block mb-1.5">Product Variant</label>
                            <Select defaultValue="variant">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="variant">Product Variant</SelectItem>
                                <SelectItem value="sku">SKU</SelectItem>
                                <SelectItem value="barcode">Barcode</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button onClick={handleSave}>Save Mapping</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">API Credentials</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Manage the credentials used to connect to PreProduct
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1.5">API Key</label>
                          <Input type="password" value="●●●●●●●●●●●●●●●●●●●●" disabled />
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Rotate API Key
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Permissions</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Control which Shopify data PreProduct can access
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Read Products</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Read Inventory</span>
                          <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Read Orders</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Read Customers</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button onClick={handleSave}>Update Security Settings</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-0 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Webhook Configuration</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Advanced settings for the Shopify to PreProduct webhooks
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1.5">Webhook URL</label>
                          <Input value="https://api.preproduct.app/webhooks/shopify" readOnly />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1.5">Secret Key</label>
                          <Input type="password" value="●●●●●●●●●●●●●●●●●●●●" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Webhook Events</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Select which events should trigger webhooks
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Product Created</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Product Updated</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Product Deleted</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Inventory Updated</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t flex justify-between">
                      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                        Reset to Defaults
                      </Button>
                      <Button onClick={handleSave}>Save Advanced Settings</Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConfigSection;
