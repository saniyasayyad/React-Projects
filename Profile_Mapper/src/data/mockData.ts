import { Profile } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'UX Designer with a passion for creating intuitive digital experiences',
    detailedBio: 'Sarah is a senior UX designer with over 8 years of experience working with tech startups and established companies. She specializes in user research, wireframing, and prototyping. Sarah has helped numerous products achieve higher user engagement and satisfaction through thoughtful design.',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    website: 'www.sarahjohnson.design',
    company: 'InnovateTech',
    position: 'Senior UX Designer',
    location: {
      address: '123 Design Avenue',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94105',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    tags: ['UX', 'Design', 'Technology', 'Creative'],
    socialMedia: {
      twitter: '@sarahjdesign',
      linkedin: 'sarahjohnson',
      github: 'sarahj',
      instagram: 'sarahjohnsondesign'
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-03-20')
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Full-stack developer specializing in React and Node.js ecosystems',
    detailedBio: 'Michael is a full-stack developer with particular expertise in React, Node.js, and cloud infrastructure. He has built scalable applications for various industries including fintech and e-commerce. Michael is passionate about clean code and mentoring junior developers.',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 987-6543',
    website: 'www.michaelchen.dev',
    company: 'TechSolutions Inc.',
    position: 'Senior Developer',
    location: {
      address: '456 Coding Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      postalCode: '98101',
      coordinates: {
        lat: 47.6062,
        lng: -122.3321
      }
    },
    tags: ['Development', 'React', 'Node.js', 'JavaScript'],
    socialMedia: {
      twitter: '@michaelcdev',
      linkedin: 'michaelchen',
      github: 'michaelc',
      instagram: 'michael.codes'
    },
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-04-05')
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Marketing specialist with expertise in digital campaigns and analytics',
    detailedBio: 'Emma is a results-driven marketing professional with expertise in digital marketing strategy, content creation, and analytics. She has successfully managed campaigns for major brands across multiple channels, consistently exceeding engagement and conversion targets.',
    email: 'emma.rodriguez@example.com',
    phone: '+1 (555) 234-5678',
    website: 'www.emmarodriguez.marketing',
    company: 'Global Marketing Solutions',
    position: 'Digital Marketing Manager',
    location: {
      address: '789 Marketing Boulevard',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    tags: ['Marketing', 'Digital', 'Analytics', 'Content'],
    socialMedia: {
      twitter: '@emmarketing',
      linkedin: 'emmarodriguez',
      instagram: 'emma.marketing'
    },
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-05-12')
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Data scientist specializing in machine learning and predictive analytics',
    detailedBio: 'David is an experienced data scientist with a PhD in Statistics. He specializes in developing machine learning models for predictive analytics and has worked across healthcare, finance, and retail sectors. His work has helped organizations make data-driven decisions that significantly improved their operations.',
    email: 'david.kim@example.com',
    phone: '+1 (555) 345-6789',
    website: 'www.davidkim.ai',
    company: 'DataMinds Analytics',
    position: 'Lead Data Scientist',
    location: {
      address: '101 Data Drive',
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      postalCode: '02108',
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    tags: ['Data Science', 'AI', 'Machine Learning', 'Analytics'],
    socialMedia: {
      twitter: '@davidkimAI',
      linkedin: 'davidkim',
      github: 'davidk'
    },
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-04-18')
  },
  {
    id: '5',
    name: 'Sophie Martin',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Environmental consultant specializing in sustainable business practices',
    detailedBio: 'Sophie is an environmental consultant with expertise in helping businesses implement sustainable practices. She has worked with Fortune 500 companies to reduce their carbon footprint and develop eco-friendly supply chains. Sophie holds an MSc in Environmental Science and is a certified sustainability practitioner.',
    email: 'sophie.martin@example.com',
    phone: '+44 20 1234 5678',
    website: 'www.sophiemartin.eco',
    company: 'GreenFuture Consulting',
    position: 'Senior Sustainability Consultant',
    location: {
      address: '25 Eco Street',
      city: 'London',
      state: '',
      country: 'UK',
      postalCode: 'EC1V 7BH',
      coordinates: {
        lat: 51.5074,
        lng: -0.1278
      }
    },
    tags: ['Environment', 'Sustainability', 'Consulting', 'Green Business'],
    socialMedia: {
      twitter: '@sophieeco',
      linkedin: 'sophiemartin',
      instagram: 'sophie.sustainable'
    },
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-05-02')
  },
  {
    id: '6',
    name: 'Carlos Mendoza',
    avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Architect specializing in sustainable urban design and public spaces',
    detailedBio: 'Carlos is an architect with a focus on sustainable urban design and public spaces. His projects have won multiple awards for innovation and environmental consciousness. He has designed landmark buildings across Latin America and Europe, always with a focus on community impact and sustainability.',
    email: 'carlos.mendoza@example.com',
    phone: '+34 91 234 5678',
    website: 'www.carlosmendoza.arch',
    company: 'Urban Future Architecture',
    position: 'Principal Architect',
    location: {
      address: '15 Arquitectura Plaza',
      city: 'Madrid',
      state: '',
      country: 'Spain',
      postalCode: '28001',
      coordinates: {
        lat: 40.4168,
        lng: -3.7038
      }
    },
    tags: ['Architecture', 'Urban Design', 'Sustainability', 'Public Spaces'],
    socialMedia: {
      twitter: '@carlosarchitect',
      linkedin: 'carlosmendoza',
      instagram: 'carlos.designs'
    },
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-04-28')
  }
];

export const allTags = Array.from(
  new Set(mockProfiles.flatMap(profile => profile.tags))
).sort();