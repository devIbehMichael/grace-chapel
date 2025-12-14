import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, Calendar, MessageSquare, DollarSign, Loader2, LogOut } from 'lucide-react';
import { dataService } from '../../services/dataService';

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Sermons', icon: Video, path: '/admin/sermons' },
    { name: 'Events', icon: Calendar, path: '/admin/events' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Giving', icon: DollarSign, path: '/admin/giving' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-900 text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gold-500 text-brand-900 font-medium shadow-md'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
            <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-white/50 hover:text-white transition">
                <LogOut className="w-5 h-5" />
                <span>Exit</span>
            </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
             {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({ sermons: 0, events: 0, messages: 0, donations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [s, e, m, d] = await Promise.all([
        dataService.getSermons(),
        dataService.getEvents(),
        dataService.getMessages(),
        dataService.getDonations()
      ]);
      setStats({
        sermons: s.length,
        events: e.length,
        messages: m.length,
        donations: d.reduce((acc, curr) => acc + curr.amount, 0)
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8"><Loader2 className="animate-spin text-brand-600" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-brand-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-brand-50 p-4 rounded-full mb-4">
             <Video className="w-8 h-8 text-brand-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-1">Total Sermons</h3>
          <p className="text-4xl font-bold text-brand-900">{stats.sermons}</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-1">Upcoming Events</h3>
          <p className="text-4xl font-bold text-brand-900">{stats.events}</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-purple-50 p-4 rounded-full mb-4">
             <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-1">New Messages</h3>
          <p className="text-4xl font-bold text-brand-900">{stats.messages}</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
           <div className="bg-green-50 p-4 rounded-full mb-4">
             <DollarSign className="w-8 h-8 text-green-500" />
           </div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-1">Total Giving</h3>
          <p className="text-4xl font-bold text-brand-900">₦{stats.donations.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout, DashboardHome };