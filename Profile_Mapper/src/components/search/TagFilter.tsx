import React from 'react';
import { X } from 'lucide-react';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  allTags, 
  selectedTags, 
  onTagSelect, 
  onClearAll 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700">Filter by tags</h3>
        
        {selectedTags.length > 0 && (
          <button 
            onClick={onClearAll}
            className="text-sm text-teal-600 hover:text-teal-800 transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-sm text-gray-500 mb-2">Selected tags:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-teal-100 text-teal-800"
              >
                {tag}
                <button 
                  onClick={() => onTagSelect(tag)}
                  className="ml-1.5 hover:text-teal-900"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;