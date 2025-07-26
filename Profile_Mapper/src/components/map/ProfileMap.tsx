import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Profile } from '../../types';
import L from 'leaflet';
import { MapPin, User, Mail, Phone, Globe } from 'lucide-react';

interface ProfileMapProps {
  selectedProfile: Profile | null;
  profiles: Profile[];
  onProfileSelect: (profile: Profile) => void;
}

// Create custom icon
const createCustomIcon = () => {
  return L.divIcon({
    className: '',
    iconSize: [30, 36],
    iconAnchor: [15, 36],
    popupAnchor: [0, -36],
    html: `
      <div class="flex justify-center items-center w-8 h-8">
        <div class="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 24 40" fill="none" stroke="#0D9488" stroke-width="2">
            <path d="M20 10c0 6-8 20-8 20s-8-14-8-20a8 8 0 0 1 16 0Z" fill="#0D9488" stroke="#0D9488"/>
            <circle cx="12" cy="10" r="3" fill="white" stroke="#0D9488"/>
          </svg>
        </div>
      </div>
    `
  });
};

// Create selected custom icon
const createSelectedIcon = () => {
  return L.divIcon({
    className: '',
    iconSize: [38, 46],
    iconAnchor: [19, 46],
    popupAnchor: [0, -46],
    html: `
      <div class="flex justify-center items-center w-10 h-10 animate-bounce">
        <div class="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 24 40" fill="none" stroke="#4F46E5" stroke-width="3">
            <path d="M20 10c0 6-8 20-8 20s-8-14-8-20a8 8 0 0 1 16 0Z" fill="#4F46E5" stroke="#4F46E5"/>
            <circle cx="12" cy="10" r="3" fill="white" stroke="#4F46E5"/>
          </svg>
        </div>
      </div>
    `
  });
};

// Component to update the map view when selected profile changes
const MapUpdater: React.FC<{ selectedProfile: Profile | null }> = ({ selectedProfile }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedProfile) {
      const { lat, lng } = selectedProfile.location.coordinates;
      map.flyTo([lat, lng], 14, {
        duration: 1.5
      });
    } else {
      // If no profile is selected, show all markers
      // Calculate bounds that contain all markers
      const profiles = map.options.profiles as Profile[];
      if (profiles?.length) {
        const bounds = L.latLngBounds(
          profiles.map(p => [p.location.coordinates.lat, p.location.coordinates.lng])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }
  }, [selectedProfile, map]);
  
  return null;
};

const ProfileMap: React.FC<ProfileMapProps> = ({ selectedProfile, profiles, onProfileSelect }) => {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<L.DivIcon | null>(null);
  
  useEffect(() => {
    setIcon(createCustomIcon());
    setSelectedIcon(createSelectedIcon());
  }, []);
  
  // Set default map view
  const defaultCenter: [number, number] = [39.8283, -98.5795]; // Center of US
  const defaultZoom = 4;
  
  if (!icon || !selectedIcon) {
    return <div className="h-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }
  
  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={defaultZoom} 
      className="h-full w-full z-0" 
      zoomControl={false}
      profiles={profiles}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater selectedProfile={selectedProfile} />
      
      {profiles.map(profile => {
        const { lat, lng } = profile.location.coordinates;
        const isSelected = selectedProfile?.id === profile.id;
        
        return (
          <Marker 
            key={profile.id}
            position={[lat, lng]}
            icon={isSelected ? selectedIcon : icon}
            eventHandlers={{
              click: () => onProfileSelect(profile)
            }}
          >
            <Popup className="profile-popup">
              <div className="profile-popup-content">
                <div className="flex items-center mb-2">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-10 h-10 rounded-full object-cover mr-2"
                  />
                  <div>
                    <h3 className="font-bold text-base">{profile.name}</h3>
                    {profile.position && (
                      <p className="text-xs text-gray-600">{profile.position}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-sm border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-start mb-1">
                    <MapPin className="h-4 w-4 mr-1.5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      {profile.location.address}, {profile.location.city}, 
                      {profile.location.state ? ` ${profile.location.state},` : ''} {profile.location.country}
                    </p>
                  </div>
                  
                  {profile.email && (
                    <div className="flex items-center mb-1">
                      <Mail className="h-4 w-4 mr-1.5 text-teal-600 flex-shrink-0" />
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="text-teal-600 hover:underline"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                  
                  {profile.phone && (
                    <div className="flex items-center mb-1">
                      <Phone className="h-4 w-4 mr-1.5 text-teal-600 flex-shrink-0" />
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
                      <Globe className="h-4 w-4 mr-1.5 text-teal-600 flex-shrink-0" />
                      <a 
                        href={`https://${profile.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProfileMap;