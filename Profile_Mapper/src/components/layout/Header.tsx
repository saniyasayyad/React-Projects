import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Map, Users, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const logoClasses = `text-xl font-bold flex items-center transition-colors duration-300 ${
    isScrolled ? 'text-teal-700' : 'text-teal-600'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className={logoClasses}>
            <Map className="mr-2 h-6 w-6" />
            <span>ProfileMapper</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 hover:text-teal-600 ${
                location.pathname === '/' ? 'text-teal-600 font-medium' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className={`transition-colors duration-200 hover:text-teal-600 ${
                location.pathname === '/admin' ? 'text-teal-600 font-medium' : 'text-gray-700'
              }`}
            >
              Admin
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-teal-600 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-600 ${
                  location.pathname === '/' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-700'
                }`}
              >
                <Users className="mr-2 h-5 w-5" />
                Home
              </Link>
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-teal-50 hover:text-teal-600 ${
                  location.pathname === '/admin' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-700'
                }`}
              >
                <Settings className="mr-2 h-5 w-5" />
                Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;