
import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { AlertCircle, HelpCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type HelpTip = {
  id: string;
  condition: (context: ReturnType<typeof useProductContext>) => boolean;
  title: string;
  content: string;
  priority: number; // Higher number = higher priority
  relatedLinks?: Array<{text: string, url: string}>; // Optional external documentation links
};

// Enhanced help tips with priority levels and related documentation links
const helpTips: HelpTip[] = [
  {
    id: 'no-tags',
    condition: (context) => context.product.tags.length === 0 && context.product.variants.length > 0,
    title: 'No Tags Applied',
    content: 'Your product has no PreProduct tags applied. This usually means all variants have positive inventory or no specific conditions that would trigger a tag.',
    priority: 1,
    relatedLinks: [
      {text: 'About Product Tags', url: '#tags'}
    ]
  },
  {
    id: 'multiple-discontinued',
    condition: (context) => {
      return context.product.variants.filter(v => 
        v.metafields.auto_preproduct_preorder_discontinued === 'yes'
      ).length > 1;
    },
    title: 'Multiple Discontinued Variants',
    content: 'You have multiple discontinued variants. Consider keeping only one variant as discontinued and removing or updating the others for a cleaner product page.',
    priority: 3,
    relatedLinks: [
      {text: 'Discontinued Best Practices', url: '#tips'}
    ]
  },
  {
    id: 'mixed-preorder',
    condition: (context) => {
      const hasPreorder = context.product.variants.some(v => 
        v.metafields.auto_preproduct_preorder === 'yes' ||
        v.metafields.auto_preproduct_preorder_launch === 'yes'
      );
      const hasBackorder = context.product.variants.some(v => 
        v.metafields.auto_preproduct_preorder_backorder === 'yes'
      );
      return hasPreorder && hasBackorder;
    },
    title: 'Mixed Pre-order and Backorder',
    content: 'Your product has both pre-order and backorder variants. This can confuse customers - consider standardizing to one status type when possible.',
    priority: 2,
    relatedLinks: [
      {text: 'Inventory Management', url: '#tutorial'}
    ]
  },
  {
    id: 'inactive-variants',
    condition: (context) => context.product.variants.some(v => v.status === 'inactive'),
    title: 'Processing Errors Detected',
    content: 'Some variants have processing errors. Check for invalid values or configurations in the variants marked as inactive.',
    priority: 5, // High priority
    relatedLinks: [
      {text: 'Troubleshooting', url: '#instructions'}
    ]
  },
  {
    id: 'pending-variants',
    condition: (context) => context.product.variants.some(v => v.status === 'pending'),
    title: 'Pending Changes',
    content: 'Some variants have pending changes. Click "Apply PreProduct Logic" to process these changes and update the product status.',
    priority: 4,
    relatedLinks: [
      {text: 'Processing Logic', url: '#instructions'}
    ]
  },
  {
    id: 'all-discontinued',
    condition: (context) => 
      context.product.variants.length > 0 && 
      context.product.variants.every(v => 
        v.metafields.auto_preproduct_preorder_discontinued === 'yes'
      ),
    title: 'All Variants Discontinued',
    content: 'All variants are marked as discontinued. This will completely disable purchasing for this product.',
    priority: 4,
    relatedLinks: [
      {text: 'Discontinued Products', url: '#tags'}
    ]
  },
  {
    id: 'future-launch-dates',
    condition: (context) => context.product.variants.some(v => {
      if (!v.launchDate) return false;
      try {
        const launchDate = new Date(v.launchDate);
        return launchDate > new Date();
      } catch {
        return false;
      }
    }),
    title: 'Future Launch Dates',
    content: 'You have variants with future launch dates. These will display as "Pre-order" with the expected release date.',
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
  }
];

const ContextualHelp: React.FC = () => {
  const context = useProductContext();
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  // Reset dismissed tips when processing occurs
  useEffect(() => {
    if (context.isProcessing) {
      setDismissedTips([]);
      setIsExpanded(true); // Auto-expand when reprocessing
    }
  }, [context.isProcessing]);

  const relevantTips = helpTips
    .filter(tip => tip.condition(context))
    .filter(tip => !dismissedTips.includes(tip.id))
    .sort((a, b) => b.priority - a.priority); // Sort by priority (highest first)

  if (!showHelp || relevantTips.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 animate-fade-in">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800/30">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-medium text-amber-700">Help & Suggestions</h3>
                <Badge count={relevantTips.length} />
              </div>
              <div className="flex items-center gap-1">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
                  </Button>
                </CollapsibleTrigger>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                  onClick={() => setShowHelp(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss all</span>
                </Button>
              </div>
            </div>
            
            <CollapsibleContent>
              <div className="space-y-3">
                {relevantTips.map(tip => (
                  <div key={tip.id} className="relative pl-5 pr-6 py-1 text-xs text-amber-700 border-l-2 border-amber-300">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-5 w-5 p-0 text-amber-400 hover:text-amber-600 hover:bg-transparent"
                      onClick={() => setDismissedTips(prev => [...prev, tip.id])}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Dismiss tip</span>
                    </Button>
                    <h4 className="font-medium mb-0.5 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      {tip.title}
                    </h4>
                    <p className="text-amber-600 text-xs leading-relaxed">{tip.content}</p>
                    
                    {tip.relatedLinks && tip.relatedLinks.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs text-amber-500">Related: </span>
                        {tip.relatedLinks.map((link, i) => (
                          <React.Fragment key={i}>
                            <a href={link.url} className="text-xs underline text-amber-600 hover:text-amber-800">
                              {link.text}
                            </a>
                            {i < tip.relatedLinks!.length - 1 && <span className="text-xs text-amber-500 mx-1">•</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  );
};

// Simple Badge component for displaying the count of tips
const Badge = ({ count }: { count: number }) => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
      {count}
    </span>
  );
};

export default ContextualHelp;
