
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductSimulator from '@/components/ProductSimulator';

const Simulator = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProductSimulator />
      <Footer />
    </div>
  );
};

export default Simulator;
