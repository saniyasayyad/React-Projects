import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileContext';
import ProfileMap from '../components/map/ProfileMap';
import { MapPin, Mail, Phone, Globe, Briefcase, Calendar, ChevronLeft, ExternalLink } from 'lucide-react';

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profiles, loading, error, selectProfile } = useProfiles();
  
  // Find the profile by ID
  const profile = profiles.find(p => p.id === id);
  
  // Set the selected profile when component mounts
  useEffect(() => {
    if (profile) {
      selectProfile(profile);
    }
    
    // Clear selection when unmounting
    return () => {
      selectProfile(null);
    };
  }, [profile, selectProfile]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-8 w-64 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-700 font-medium mb-2">
            {error || "Profile not found"}
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-800"
          >
            Go back to profiles
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <Link 
        to="/" 
        className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all profiles
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-teal-500 to-indigo-600">
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        </div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
          <div className="relative -mt-16 sm:-mt-24 flex justify-center">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
          
          <div className="text-center mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            
            <div className="flex justify-center items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1 text-teal-500" />
              <span>
                {profile.location.city}, {profile.location.country}
              </span>
            </div>
            
            {profile.position && (
              <div className="flex justify-center items-center mt-2 text-gray-600">
                <Briefcase className="h-4 w-4 mr-1 text-teal-500" />
                <span>
                  {profile.position} {profile.company && `at ${profile.company}`}
                </span>
              </div>
            )}
            
            <p className="mt-4 text-gray-700 max-w-xl mx-auto">
              {profile.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {profile.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-700">
                  {profile.detailedBio || profile.description}
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-teal-500 mr-2" />
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="text-teal-600 hover:underline"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                  
                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-teal-500 mr-2" />
                      <a 
                        href={`tel:${profile.phone}`} 
                        className="text-teal-600 hover:underline"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  )}
                  
                  {profile.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-teal-500 mr-2" />
                      <a 
                        href={`https://${profile.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline flex items-center"
                      >
                        {profile.website}
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-teal-500 mr-2" />
                    <span className="text-gray-700">
                      Member since {profile.createdAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              {profile.socialMedia && Object.values(profile.socialMedia).some(Boolean) && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect</h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.socialMedia.twitter && (
                      <a 
                        href={`https://twitter.com/${profile.socialMedia.twitter}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center hover:bg-blue-100 transition-colors"
                      >
                        Twitter
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                    
                    {profile.socialMedia.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${profile.socialMedia.linkedin}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-700 text-white rounded-lg flex items-center hover:bg-blue-800 transition-colors"
                      >
                        LinkedIn
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                    
                    {profile.socialMedia.github && (
                      <a 
                        href={`https://github.com/${profile.socialMedia.github}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center hover:bg-gray-900 transition-colors"
                      >
                        GitHub
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                    
                    {profile.socialMedia.instagram && (
                      <a 
                        href={`https://instagram.com/${profile.socialMedia.instagram}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg flex items-center hover:bg-pink-100 transition-colors"
                      >
                        Instagram
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6 h-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden shadow-md h-[300px]">
                  <ProfileMap
                    selectedProfile={profile}
                    profiles={[profile]}
                    onProfileSelect={() => {}}
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Address</h3>
                  <address className="not-italic text-gray-600">
                    {profile.location.address}<br />
                    {profile.location.city}, 
                    {profile.location.state ? ` ${profile.location.state},` : ''} 
                    {profile.location.postalCode && ` ${profile.location.postalCode}`}<br />
                    {profile.location.country}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;