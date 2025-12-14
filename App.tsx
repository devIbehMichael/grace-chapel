import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AdminLayout, DashboardHome } from './pages/admin/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Sermons from './pages/Sermons';
import SermonDetails from './pages/SermonDetails';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Giving from './pages/Giving';
import Login from './pages/Login';
import AdminSermons from './pages/admin/AdminSermons';
import AdminEvents from './pages/admin/AdminEvents';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGiving from './pages/admin/AdminGiving';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route path="/" element={<Layout user={user} onLogout={handleLogout}><Home /></Layout>} />
        <Route path="/about" element={<Layout user={user} onLogout={handleLogout}><About /></Layout>} />
        <Route path="/sermons" element={<Layout user={user} onLogout={handleLogout}><Sermons /></Layout>} />
        <Route path="/sermons/:id" element={<Layout user={user} onLogout={handleLogout}><SermonDetails /></Layout>} />
        <Route path="/events" element={<Layout user={user} onLogout={handleLogout}><Events /></Layout>} />
        <Route path="/contact" element={<Layout user={user} onLogout={handleLogout}><Contact /></Layout>} />
        <Route path="/giving" element={<Layout user={user} onLogout={handleLogout}><Giving /></Layout>} />
        <Route path="/login" element={<Layout user={user} onLogout={handleLogout}><Login onLogin={setUser} /></Layout>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
           <Route path="dashboard" element={<DashboardHome />} />
           <Route path="sermons" element={<AdminSermons />} />
           <Route path="events" element={<AdminEvents />} />
           <Route path="messages" element={<AdminMessages />} />
           <Route path="giving" element={<AdminGiving />} />
           <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;