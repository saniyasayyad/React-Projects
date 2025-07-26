import React, { useState } from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import { Profile } from '../types';
import { Plus, Edit, Trash, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/admin/ProfileForm';

const AdminDashboard: React.FC = () => {
  const { profiles, loading, error, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.location.city.toLowerCase().includes(searchLower) ||
      profile.location.country.toLowerCase().includes(searchLower)
    );
  });
  
  const handleAddNew = () => {
    setCurrentProfile(null);
    setShowForm(true);
  };
  
  const handleEdit = (profile: Profile) => {
    setCurrentProfile(profile);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
    }
  };
  
  const handleFormSubmit = (profileData: Profile) => {
    if (currentProfile) {
      updateProfile(currentProfile.id, profileData);
    } else {
      addProfile(profileData);
    }
    setShowForm(false);
  };
  
  const handleCancel = () => {
    setShowForm(false);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-24 w-full max-w-3xl bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-700 font-medium">
            {error}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage profiles, add new users, or update existing information.
          </p>
        </div>
        
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Profile
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
      
      {/* Profiles Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No profiles found
                  </td>
                </tr>
              ) : (
                filteredProfiles.map(profile => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            src={profile.avatar} 
                            alt={profile.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {profile.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {profile.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {profile.location.city}
                      </div>
                      <div className="text-sm text-gray-500">
                        {profile.location.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {profile.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {profile.tags.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{profile.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/profile/${profile.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="View profile"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleEdit(profile)}
                          className="text-amber-600 hover:text-amber-900 p-1"
                          title="Edit profile"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete profile"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentProfile ? 'Edit Profile' : 'Add New Profile'}
              </h2>
              
              <ProfileForm 
                profile={currentProfile}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;