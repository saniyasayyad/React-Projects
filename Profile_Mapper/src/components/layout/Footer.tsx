import React from 'react';
import { Map, Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Map className="mr-2 h-5 w-5 text-teal-400" />
            <span className="text-lg font-bold">ProfileMapper</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span>Made with</span>
            <Heart className="mx-1 h-4 w-4 text-red-400 animate-pulse" />
            <span>in 2025 | </span>
           
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2025 ProfileMapper. All rights reserved.</p>
          <p className="mt-2">
            Using{' '}
            <a 
              href="https://react-leaflet.js.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              React Leaflet
            </a>
            {' '}for interactive maps.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;