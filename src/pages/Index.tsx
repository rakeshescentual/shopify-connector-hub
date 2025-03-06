
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ConnectFlow from '@/components/ConnectFlow';
import Dashboard from '@/components/Dashboard';
import ConfigSection from '@/components/ConfigSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ConnectFlow />
      <Dashboard />
      <ConfigSection />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore PreProduct Integration</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Learn how to implement our Shopify integration and test it with a product simulator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/rules">
                <BookOpen size={18} />
                Integration Rules
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/simulator">
                <Play size={18} />
                Product Simulator
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
