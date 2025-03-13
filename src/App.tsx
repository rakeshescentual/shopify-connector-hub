
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Simulator from '@/pages/Simulator';
import Documentation from '@/pages/Documentation';
import Rules from '@/pages/Rules';
import Configuration from '@/pages/Configuration';
import NotFound from '@/pages/NotFound';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
