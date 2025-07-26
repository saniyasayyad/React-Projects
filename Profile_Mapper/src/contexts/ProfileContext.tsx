import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  selectedProfile: Profile | null;
  filteredProfiles: Profile[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectProfile: (profile: Profile | null) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, updatedProfile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load mock data on initial render
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(mockProfiles);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profiles');
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.location.city.toLowerCase().includes(searchLower) ||
      profile.location.country.toLowerCase().includes(searchLower) ||
      profile.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Select a profile for detailed view
  const selectProfile = (profile: Profile | null) => {
    setSelectedProfile(profile);
  };

  // Add a new profile
  const addProfile = (profile: Profile) => {
    setProfiles(prev => [...prev, { ...profile, id: crypto.randomUUID() }]);
  };

  // Update an existing profile
  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles(prev =>
      prev.map(profile =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
    
    // Update selected profile if it's the one being edited
    if (selectedProfile?.id === id) {
      setSelectedProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
    }
  };

  // Delete a profile
  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    
    // Clear selected profile if it's the one being deleted
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  const value = {
    profiles,
    loading,
    error,
    selectedProfile,
    filteredProfiles,
    searchTerm,
    setSearchTerm,
    selectProfile,
    addProfile,
    updateProfile,
    deleteProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};