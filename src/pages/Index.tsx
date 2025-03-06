
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ConnectFlow from '@/components/ConnectFlow';
import Dashboard from '@/components/Dashboard';
import ConfigSection from '@/components/ConfigSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ConnectFlow />
      <Dashboard />
      <ConfigSection />
      <Footer />
    </div>
  );
};

export default Index;
