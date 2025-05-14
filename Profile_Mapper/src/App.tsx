import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './contexts/ProfileContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProfileDetails from './pages/ProfileDetails';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;