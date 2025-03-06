
import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { AlertCircle, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type HelpTip = {
  id: string;
  condition: (context: ReturnType<typeof useProductContext>) => boolean;
  title: string;
  content: string;
};

const helpTips: HelpTip[] = [
  {
    id: 'no-tags',
    condition: (context) => context.product.tags.length === 0 && context.product.variants.length > 0,
    title: 'No Tags Applied',
    content: 'Your product has no PreProduct tags applied. This usually means all variants have positive inventory or no specific conditions that would trigger a tag.'
  },
  {
    id: 'multiple-discontinued',
    condition: (context) => {
      return context.product.variants.filter(v => 
        v.metafields.auto_preproduct_preorder_discontinued === 'yes'
      ).length > 1;
    },
    title: 'Multiple Discontinued Variants',
    content: 'You have multiple discontinued variants. Consider keeping only one variant as discontinued and removing or updating the others for a cleaner product page.'
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
    content: 'Your product has both pre-order and backorder variants. This can confuse customers - consider standardizing to one status type when possible.'
  },
  {
    id: 'inactive-variants',
    condition: (context) => context.product.variants.some(v => v.status === 'inactive'),
    title: 'Processing Errors Detected',
    content: 'Some variants have processing errors. Check for invalid values or configurations in the variants marked as inactive.'
  },
  {
    id: 'pending-variants',
    condition: (context) => context.product.variants.some(v => v.status === 'pending'),
    title: 'Pending Changes',
    content: 'Some variants have pending changes. Click "Apply PreProduct Logic" to process these changes and update the product status.'
  }
];

const ContextualHelp: React.FC = () => {
  const context = useProductContext();
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(true);

  // Reset dismissed tips when processing occurs
  useEffect(() => {
    if (context.isProcessing) {
      setDismissedTips([]);
    }
  }, [context.isProcessing]);

  const relevantTips = helpTips
    .filter(tip => tip.condition(context))
    .filter(tip => !dismissedTips.includes(tip.id));

  if (!showHelp || relevantTips.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 animate-fade-in">
      <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800/30">
        <CardContent className="pt-4 pb-3 px-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-medium text-amber-700">Help & Suggestions</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
              onClick={() => setShowHelp(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
          
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextualHelp;
