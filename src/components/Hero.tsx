
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Plug } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY;
      const opacity = 1 - (scrollPos * 0.003);
      const translateY = scrollPos * 0.3;
      if (heroRef.current) {
        heroRef.current.style.opacity = Math.max(opacity, 0).toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Gradient Element */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '0.2s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '0.5s' }} />
      
      <div ref={heroRef} className="container max-w-5xl mx-auto text-center z-10 transition-all duration-700">
        <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
          <span className="mr-2">✨</span>
          Seamlessly connect your Shopify store to PreProduct
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Connect <span className="text-primary">Escentual</span> to PreProduct
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Unlock powerful product testing and feedback capabilities by connecting your Shopify store to the PreProduct testing platform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all group">
            Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base shadow-sm hover:shadow-md hover:bg-secondary/80 transition-all">
            Learn More
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-md">
              <Plug size={16} className="text-white" />
            </div>
          </div>
          <span className="ml-4 text-sm text-gray-500">Trusted by 100+ merchants</span>
        </div>
      </div>

      {/* Subtle bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
