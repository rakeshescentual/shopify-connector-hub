
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ConnectFlow from '@/components/ConnectFlow';
import Dashboard from '@/components/Dashboard';
import ConfigSection from '@/components/ConfigSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Play, FileText, Server, Sparkles, Code, Clock } from 'lucide-react';

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
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/documentation">
                <FileText size={18} />
                Developer Docs
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Sparkles className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Gadget.dev Ready</h3>
              <p className="text-emerald-700 text-sm mb-4 max-w-xl">
                This application is optimized for the latest Gadget.dev features including Enhanced Effect Builder, 
                Field-Level Permissions, GraphQL API Builder, Schedule Builder, and improved TypeScript integration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-4">
                <div className="bg-white bg-opacity-50 p-3 rounded border border-emerald-100 flex items-start">
                  <Code className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-xs text-left">
                    <span className="font-medium text-emerald-800">TypeScript Integration</span>
                    <p className="text-emerald-700">Fully typed APIs with auto-generated types</p>
                  </div>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded border border-emerald-100 flex items-start">
                  <Clock className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-xs text-left">
                    <span className="font-medium text-emerald-800">Schedule Builder</span>
                    <p className="text-emerald-700">Create time-based jobs with improved reliability</p>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" variant="default" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <a href="https://docs.gadget.dev/" target="_blank" rel="noopener noreferrer">
                  <Server size={18} />
                  Explore Gadget.dev Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
