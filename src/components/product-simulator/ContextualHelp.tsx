
import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HelpTip {
  id: string;
  condition: (context: ReturnType<typeof useProductContext>) => boolean;
  title: string;
  content: string;
  priority: number;
  relatedLinks?: Array<{text: string, url: string}>;
}

const ContextualHelp: React.FC = () => {
  const context = useProductContext();
  const [activeTips, setActiveTips] = useState<HelpTip[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  
  // Reset dismissed tips whenever product is processed
  useEffect(() => {
    if (context.product.lastProcessed) {
      setDismissed(new Set());
    }
  }, [context.product.lastProcessed]);
  
  // Evaluate relevant tips
  useEffect(() => {
    const relevant = helpTips
      .filter(tip => !dismissed.has(tip.id) && tip.condition(context))
      .sort((a, b) => a.priority - b.priority);
    
    setActiveTips(relevant);
  }, [context, dismissed]);
  
  if (activeTips.length === 0) return null;
  
  return (
    <Card className="mt-6 overflow-hidden border-primary/20 shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-3 bg-primary/5 flex flex-row items-center justify-between space-y-0 group cursor-pointer" asChild>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm font-medium">Contextual Help</CardTitle>
              <Badge variant="outline" className="text-[10px] py-0 h-4">
                {activeTips.length} {activeTips.length === 1 ? 'tip' : 'tips'}
              </Badge>
            </div>
            <div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="p-0">
            <ScrollArea className="h-full max-h-[300px]">
              <div className="space-y-1 p-4">
                {activeTips.map((tip) => (
                  <div key={tip.id} className="group relative p-3 border rounded-md">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-5 w-5 absolute right-2 top-2 opacity-50 hover:opacity-100"
                      onClick={() => setDismissed(prev => new Set([...prev, tip.id]))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    
                    <h3 className="text-sm font-medium mb-1 pr-6">{tip.title}</h3>
                    <p className="text-xs text-muted-foreground">{tip.content}</p>
                    
                    {tip.relatedLinks && tip.relatedLinks.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tip.relatedLinks.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="py-2 px-4 bg-primary/5 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setDismissed(new Set(activeTips.map(tip => tip.id)))}
            >
              Dismiss all
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

const helpTips: HelpTip[] = [
  {
    id: 'discontinued-item',
    condition: (context) => context.product.variants.some(v => 
      v.metafields['custom.discontinued'] !== 'No' && 
      v.metafields['custom.discontinued'] !== undefined
    ),
    title: 'Discontinued Items Detected',
    content: 'Variants marked as discontinued will display as unavailable when inventory reaches zero and will be tagged with preproduct_preorder_discontinued.',
    priority: 1,
    relatedLinks: [
      {text: 'Discontinued Settings', url: '#discontinued'}
    ]
  },
  {
    id: 'launch-date',
    condition: (context) => context.product.variants.some(v => v.launchDate),
    title: 'Launch Date Found',
    content: 'When a variant has a future launch date, it will be tagged with preproduct_preorder_launch regardless of inventory levels.',
    priority: 1,
    relatedLinks: [
      {text: 'Launch Date Best Practices', url: '#launch'}
    ]
  },
  {
    id: 'extended-backorder',
    condition: (context) => context.product.variants.some(v => v.backorderWeeks >= 4),
    title: 'Extended Backorder',
    content: 'When backorder weeks are set to 4 or more, the variant will transition to Notify Me status instead of Backorder.',
    priority: 2,
    relatedLinks: [
      {text: 'Backorder Settings', url: '#backorder'}
    ]
  },
  {
    id: 'mixed-inventory',
    condition: (context) => {
      const hasInStock = context.product.variants.some(v => v.inventory > 0);
      const hasOutOfStock = context.product.variants.some(v => v.inventory <= 0);
      return hasInStock && hasOutOfStock;
    },
    title: 'Mixed Inventory Status',
    content: 'Your product has both in-stock and out-of-stock variants. This may affect quick buy functionality when processed.',
    priority: 2,
    relatedLinks: [
      {text: 'Quick Buy Settings', url: '#quickbuy'}
    ]
  },
  {
    id: 'pending-variants',
    condition: (context) => context.product.variants.some(v => v.status === 'pending'),
    title: 'Pending Variants',
    content: 'Some variants are pending processing. Apply PreProduct Logic to finalize all variant statuses.',
    priority: 1,
    relatedLinks: [
      {text: 'Processing Steps', url: '#tutorial'}
    ]
  },
  {
    id: 'zero-inventory',
    condition: (context) => context.product.variants.every(v => v.inventory <= 0),
    title: 'All Variants Out of Stock',
    content: 'All variants are out of stock. The product will be tagged based on each variant\'s status (backorder, notify me, etc.).',
    priority: 2,
    relatedLinks: [
      {text: 'Pre-order Settings', url: '#tags'}
    ]
  },
  {
    id: 'high-min-qty',
    condition: (context) => context.product.variants.some(v => 
      v.metafields['custom.ordering_min_qty'] > 1
    ),
    title: 'High Minimum Order Quantity',
    content: 'Some variants have a minimum order quantity greater than 1. This will affect which status tag is applied when inventory reaches zero.',
    priority: 2,
    relatedLinks: [
      {text: 'Order Quantities', url: '#tips'}
    ]
  },
  {
    id: 'inconsistent-statuses',
    condition: (context) => {
      const statuses = new Set();
      context.product.variants.forEach(v => {
        Object.entries(v.metafields).forEach(([key, value]) => {
          if (key.startsWith('auto_preproduct_preorder') && value === 'yes') {
            statuses.add(key);
          }
        });
      });
      return statuses.size > 2; // More than 2 different statuses is potentially confusing
    },
    title: 'Inconsistent Variant Statuses',
    content: 'Your product has many different status types across variants. Consider standardizing to fewer status types for a better customer experience.',
    priority: 3,
    relatedLinks: [
      {text: 'Status Best Practices', url: '#tips'}
    ]
  },
  {
    id: 'never-in-stock',
    condition: (context) => context.product.variants.some(v => 
      v.inventory <= 0 && !v.hadStockBefore
    ),
    title: 'Never In Stock Items',
    content: 'Some variants have never been in stock. These will be tagged as preproduct_preorder when processed.',
    priority: 2,
    relatedLinks: [
      {text: 'Pre-order vs Backorder', url: '#tutorial'}
    ]
  },
  {
    id: 'multiple-variant-groups',
    condition: (context) => {
      const groups = new Set();
      context.product.variants.forEach(v => {
        const group = v.title.split('-')[0].trim();
        if (group) groups.add(group);
      });
      return groups.size > 1;
    },
    title: 'Multiple Variant Groups',
    content: 'Your product has multiple variant groups. Use the filter in the variant selector to navigate between groups more easily.',
    priority: 3,
    relatedLinks: [
      {text: 'Organizing Variants', url: '#tips'}
    ]
  }
];

export default ContextualHelp;
