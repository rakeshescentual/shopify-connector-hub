
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plug, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold transition-opacity hover:opacity-80"
        >
          <Plug size={24} className="text-primary" strokeWidth={2.5} />
          <span className="animate-fade-in">ConnectPreProduct</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
          <Button size="sm" variant="default" className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
            Connect Store
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20 px-6 md:hidden flex flex-col space-y-6 transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <Link 
          to="/" 
          className="text-lg font-medium py-2 border-b border-border"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/#features" 
          className="text-lg font-medium py-2 border-b border-border"
          onClick={() => setMobileMenuOpen(false)}
        >
          Features
        </Link>
        <Link 
          to="/#how-it-works" 
          className="text-lg font-medium py-2 border-b border-border"
          onClick={() => setMobileMenuOpen(false)}
        >
          How It Works
        </Link>
        <Button 
          className="w-full rounded-full mt-6 py-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          Connect Store
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
