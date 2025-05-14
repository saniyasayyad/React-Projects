import React, { useState, useEffect } from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import ProfileList from '../components/profiles/ProfileList';
import ProfileMap from '../components/map/ProfileMap';
import SearchBar from '../components/search/SearchBar';
import { Profile } from '../types';
import { XCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { 
    filteredProfiles, 
    loading, 
    error, 
    selectedProfile, 
    selectProfile
  } = useProfiles();
  
  const [showMap, setShowMap] = useState(false);
  
  // Auto-show map when a profile is selected
  useEffect(() => {
    if (selectedProfile) {
      setShowMap(true);
    }
  }, [selectedProfile]);
  
  // Function to handle selecting a profile
  const handleSelectProfile = (profile: Profile) => {
    selectProfile(profile);
  };
  
  // Clear selected profile and optionally hide map
  const handleClearSelection = (hideMap = false) => {
    selectProfile(null);
    if (hideMap) {
      setShowMap(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Find and Explore Profiles
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Browse through our collection of professionals from around the world.
          View their locations on the map and discover more about their expertise.
        </p>
      </div>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className={`${showMap ? 'lg:w-3/5' : 'w-full'} transition-all duration-300`}>
          <ProfileList
            profiles={filteredProfiles}
            loading={loading}
            error={error}
            onSelectProfile={handleSelectProfile}
          />
        </div>
        
        {showMap && (
          <div className="lg:w-2/5 h-[500px] lg:h-auto relative bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => handleClearSelection(true)}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close map"
              >
                <XCircle className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <ProfileMap
              selectedProfile={selectedProfile}
              profiles={filteredProfiles}
              onProfileSelect={handleSelectProfile}
            />
            
            {selectedProfile && (
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={selectedProfile.avatar} 
                    alt={selectedProfile.name} 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-bold">{selectedProfile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedProfile.location.city}, {selectedProfile.location.country}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;