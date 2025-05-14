import React, { useState, useEffect } from 'react';
import { Profile, Location } from '../../types';
import { X, Plus } from 'lucide-react';

interface ProfileFormProps {
  profile: Profile | null;
  onSubmit: (profile: Profile) => void;
  onCancel: () => void;
}

const defaultLocation: Location = {
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  coordinates: {
    lat: 0,
    lng: 0
  }
};

const defaultProfile: Profile = {
  id: '',
  name: '',
  avatar: '',
  description: '',
  detailedBio: '',
  email: '',
  phone: '',
  website: '',
  company: '',
  position: '',
  location: defaultLocation,
  tags: [],
  socialMedia: {
    twitter: '',
    linkedin: '',
    github: '',
    instagram: ''
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Profile>(defaultProfile);
  const [tagInput, setTagInput] = useState<string>('');
  
  // Initialize form with profile data if editing
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      setFormData({
        ...defaultProfile,
        id: crypto.randomUUID(), // Generate new ID for new profile
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [profile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Profile],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };
  
  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [name]: isNaN(numValue) ? 0 : numValue
        }
      }
    }));
  };
  
  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      updatedAt: new Date()
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar URL *
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Short Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="detailedBio" className="block text-sm font-medium text-gray-700">
              Detailed Bio
            </label>
            <textarea
              id="detailedBio"
              name="detailedBio"
              rows={4}
              value={formData.detailedBio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
        </div>
        
        {/* Location & Social */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Location Information</h3>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.location.address}
                onChange={handleLocationChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.location.city}
                  onChange={handleLocationChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.location.country}
                  onChange={handleLocationChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.location.postalCode}
                  onChange={handleLocationChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="any"
                  id="lat"
                  name="lat"
                  value={formData.location.coordinates.lat}
                  onChange={handleCoordinateChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="any"
                  id="lng"
                  name="lng"
                  value={formData.location.coordinates.lng}
                  onChange={handleCoordinateChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Tags</h3>
            
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-teal-50 text-teal-700 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-teal-700 hover:text-teal-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {formData.tags.length === 0 && (
                <span className="text-sm text-gray-500">No tags added yet</span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Social Media</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  Twitter Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.socialMedia?.twitter || ''}
                    onChange={handleSocialMediaChange}
                    className="block w-full rounded-r-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn Username
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.socialMedia?.linkedin || ''}
                  onChange={handleSocialMediaChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={formData.socialMedia?.github || ''}
                  onChange={handleSocialMediaChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram Username
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.socialMedia?.instagram || ''}
                  onChange={handleSocialMediaChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          {profile ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;