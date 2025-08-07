'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './MyUi/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-5 ${
      isScrolled 
        ? 'bg-white shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                isScrolled ? 'bg-primary-600' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <Image width={100} height={100} src="/Logo.svg" alt="WiseUP" />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden absolute left-1/2 transform -translate-x-1/2 md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-100' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center ">
            <a 
              href="sign-in" 
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-neutral-700 hover:text-primary-700' : ''
              }`}
            >
              <Button>
              Log in
              </Button>
            </a>
            <a 
              href="sign-up" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-white hover:bg-white/90 text-primary-900'
              }`}
            >
              <Button variant='secondary'>
              Sign up
              </Button>
              
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-neutral-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X size={24} className={isScrolled ? 'text-neutral-900' : ''} /> : 
              <Menu size={24} className={isScrolled ? 'text-neutral-900' : ''} />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg mt-4 p-4 shadow-lg animate-scale-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-700 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <hr className="my-2 border-neutral-200" />
              <a 
                href="/sign-in" 
                className="px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-700 font-medium"
              >
                Log in
              </a>
              <a 
                href="/sign-up" 
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 font-medium text-center"
              >
                Sign up
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;