import React from 'react';
import { Profile } from '../../types';
import { Link } from 'react-router-dom';
import { MapPin, Info, User, Briefcase } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSelect: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold">{profile.name}</h3>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{profile.location.city}, {profile.location.country}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start mb-3">
          {profile.company && (
            <div className="flex items-center text-sm text-gray-600 mr-4">
              <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-500" />
              <span>{profile.position}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{profile.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {profile.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{profile.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => onSelect(profile)}
            className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200"
            aria-label={`Show location for ${profile.name}`}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Show on Map
          </button>
          
          <Link
            to={`/profile/${profile.id}`}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <Info className="h-4 w-4 mr-1" />
            Profile Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;