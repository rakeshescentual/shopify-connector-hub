
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Check, Zap, Database, Shield, Code, Clock, Braces } from 'lucide-react';

type FeatureProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'new';
};

const Feature = ({ title, description, icon = <Sparkles className="h-4 w-4 text-primary mr-2" />, variant = 'default' }: FeatureProps) => {
  const getBgColor = () => {
    switch (variant) {
      case 'highlight':
        return 'bg-amber-50 border-amber-100';
      case 'new':
        return 'bg-green-50 border-green-100';
      default:
        return 'border';
    }
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'highlight':
        return 'text-amber-800';
      case 'new':
        return 'text-green-800';
      default:
        return 'text-foreground';
    }
  };
  
  const getIconColor = () => {
    switch (variant) {
      case 'highlight':
        return 'text-amber-600';
      case 'new':
        return 'text-green-600';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`${getBgColor()} rounded-md p-4 hover:bg-primary/5 transition-colors flex items-start`}>
      {React.cloneElement(icon as React.ReactElement, { 
        className: `h-4 w-4 ${getIconColor()} mr-2 mt-0.5 flex-shrink-0`
      })}
      <div>
        <h4 className={`font-medium text-sm mb-1 ${getTextColor()}`}>{title}</h4>
        <p className={`text-xs ${variant === 'default' ? 'text-muted-foreground' : getTextColor()}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const GadgetFeatures = () => {
  const latestFeatures = [
    {
      title: "GraphQL API Builder",
      description: "Create custom GraphQL APIs with full type safety, comprehensive filtering, and enhanced performance",
      icon: <Database />,
      variant: "new" as const
    },
    {
      title: "Enhanced Effect Builder",
      description: "Improved real-time validation with detailed debugging tools and execution monitoring",
      icon: <Zap />,
      variant: "new" as const
    },
    {
      title: "Field-Level Permissions",
      description: "Granular, role-based access control with enhanced security rules for sensitive data",
      icon: <Shield />,
      variant: "new" as const
    },
    {
      title: "TypeScript Integration",
      description: "Auto-generated types with full type safety and enhanced schema validation",
      icon: <Code />,
      variant: "new" as const
    },
    {
      title: "Schedule Builder",
      description: "Create time-based jobs with improved monitoring, reliability, and scheduling options",
      icon: <Clock />,
      variant: "new" as const
    },
    {
      title: "Action Builder Improvements",
      description: "Better validation, error handling, and execution monitoring with detailed logs",
      icon: <Braces />,
      variant: "new" as const
    }
  ];

  const advancedFeatures = [
    {
      title: "Enhanced Connections",
      description: "Use Gadget's improved Shopify connection with automatic rate limiting and webhook handling",
      variant: "default" as const
    },
    {
      title: "Global State",
      description: "Store configuration settings using Gadget's enhanced Global State feature with improved caching",
      variant: "default" as const
    },
    {
      title: "Environment Variables",
      description: "Secure handling of API keys with improved secret rotation and versioning",
      variant: "default" as const
    },
    {
      title: "Improved Development Experience",
      description: "Enhanced local development workflow with better debugging and testing tools",
      variant: "default" as const
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Latest Gadget.dev Features</h3>
      
      <div className="space-y-3 mb-6">
        {latestFeatures.map((feature, index) => (
          <Feature 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            variant={feature.variant}
          />
        ))}
      </div>
      
      <h3 className="text-lg font-medium mb-4">Key Gadget.dev Features to Utilize</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advancedFeatures.map((feature, index) => (
          <Feature 
            key={index}
            title={feature.title}
            description={feature.description}
            variant={feature.variant}
          />
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-6">
        <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
          <Check className="h-4 w-4 mr-2 text-green-600" />
          Latest Compatibility Updates
        </h4>
        <p className="text-xs text-green-700">
          This guide has been updated to align with Gadget.dev's latest features including GraphQL API Builder, 
          Schedule Builder, enhanced Effect Builder, improved Field-Level Permissions, better TypeScript integration, 
          and Action Builder improvements. These updates ensure our PreProduct application will leverage 
          all of Gadget's latest capabilities.
        </p>
      </div>
      
      <div className="border border-amber-100 bg-amber-50 rounded-md p-4 mt-4 flex items-start">
        <Zap className="text-amber-600 h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          Use Gadget's improved Schedule Builder to automate product status updates and inventory synchronization
          on customizable time intervals with enhanced reliability monitoring.
        </p>
      </div>
    </Card>
  );
};

export default GadgetFeatures;
