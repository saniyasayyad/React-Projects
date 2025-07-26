export interface Location {
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  detailedBio?: string;
  email?: string;
  phone?: string;
  website?: string;
  company?: string;
  position?: string;
  location: Location;
  tags: string[];
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  searchTerm: string;
  tags: string[];
  location?: string;
}