import React from 'react';
import { Profile } from '../../types';
import ProfileCard from './ProfileCard';
import { Loader } from 'lucide-react';

interface ProfileListProps {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  onSelectProfile: (profile: Profile) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ 
  profiles, 
  loading, 
  error, 
  onSelectProfile 
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-teal-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Error loading profiles</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center">
        <p className="font-medium">No profiles found</p>
        <p className="text-sm mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          onSelect={onSelectProfile} 
        />
      ))}
    </div>
  );
};

export default ProfileList;