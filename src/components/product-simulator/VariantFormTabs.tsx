
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Package, Info } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useProductContext } from '@/contexts/ProductContext';
import BasicInfoTab from './tabs/BasicInfoTab';
import InventoryTab from './tabs/InventoryTab';
import MetafieldsTab from './tabs/MetafieldsTab';

const VariantFormTabs = () => {
  const { editableVariant } = useProductContext();

  if (!editableVariant) return <div className="p-4 text-center">Loading variant...</div>;
  
  return (
    <TooltipProvider>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-3 bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="basic" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Tag size={16} />
            <span>Basic Info</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Package size={16} />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="metafields" className="flex items-center gap-2 data-[state=active]:bg-white/70">
            <Info size={16} />
            <span>Metafields</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6 animate-fade-in">
          <BasicInfoTab />
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6 animate-fade-in">
          <InventoryTab />
        </TabsContent>
        
        <TabsContent value="metafields" className="space-y-5 animate-fade-in">
          <MetafieldsTab />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default VariantFormTabs;
