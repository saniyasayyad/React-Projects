import React, { useState, useEffect, useRef } from 'react';
import { useProfiles } from '../../contexts/ProfileContext';
import { Search, X, Filter } from 'lucide-react';
import TagFilter from './TagFilter';
import { allTags } from '../../data/mockData';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useProfiles();
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks to close tag filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowTagFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply tag filters to search term
  useEffect(() => {
    const tagQuery = selectedTags.length > 0 
      ? selectedTags.map(tag => tag).join(' ') 
      : '';
    
    setSearchTerm((prevTerm) => {
      // Extract non-tag part of the search
      const baseSearch = prevTerm.replace(/\b(tag:)[\w\s]+\b/g, '').trim();
      
      // Combine base search with tag query
      return tagQuery ? `${baseSearch} ${tagQuery}`.trim() : baseSearch;
    });
  }, [selectedTags, setSearchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedTags([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleTagFilter = () => {
    setShowTagFilter(!showTagFilter);
  };

  return (
    <div className="relative w-full" ref={filterRef}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search profiles by name, location or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="p-1 mr-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
          
          <button
            onClick={toggleTagFilter}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              showTagFilter 
                ? 'bg-teal-100 text-teal-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Filter by tags"
            aria-expanded={showTagFilter}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {showTagFilter && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fadeIn">
          <TagFilter 
            allTags={allTags} 
            selectedTags={selectedTags}
            onTagSelect={(tag) => {
              setSelectedTags(prev => 
                prev.includes(tag) 
                  ? prev.filter(t => t !== tag) 
                  : [...prev, tag]
              );
            }}
            onClearAll={() => setSelectedTags([])}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;