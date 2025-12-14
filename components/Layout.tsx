import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Church, User, LogOut, Instagram, Facebook, Youtube } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: { role: string } | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Determine if we are on the home page for transparency logic
  const isHome = location.pathname === '/';
  
  // Navbar styling based on state
  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    scrolled || !isHome 
      ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' 
      : 'bg-transparent py-6'
  }`;
  
  const textClass = scrolled || !isHome ? 'text-gray-800' : 'text-white';
  const logoClass = scrolled || !isHome ? 'text-brand-600' : 'text-white';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
    { name: 'Give', path: '/giving', highlight: true },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-cream-50 selection:bg-gold-500 selection:text-white">
      {/* Navigation */}
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
              <Church className={`h-8 w-8 mr-3 transition-colors ${logoClass}`} />
              <div className="flex flex-col">
                <span className={`font-serif font-bold text-xl tracking-wide leading-none ${textClass}`}>GRACE CHAPEL</span>
                <span className={`text-[10px] uppercase tracking-[0.2em] opacity-80 ${textClass}`}>Est. 1995</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    link.highlight
                      ? 'px-6 py-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 shadow-lg shadow-gold-500/30'
                      : `${textClass} hover:opacity-70`
                  }`}
                >
                  {link.name}
                  {!link.highlight && (
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`}></span>
                  )}
                </Link>
              ))}

              {/* Admin / Login Link */}
              {user ? (
                <div className={`flex items-center space-x-4 ml-4 pl-4 border-l ${scrolled || !isHome ? 'border-gray-200' : 'border-white/20'}`}>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className={`text-sm font-medium ${textClass} hover:text-gold-500`}>
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={onLogout}
                    className="text-sm font-medium text-red-500 hover:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className={`ml-2 ${textClass} hover:text-gold-500 transition-colors`}>
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className={`${textClass} focus:outline-none`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 bg-brand-900 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
           <div className="flex flex-col h-full justify-center px-8 space-y-6">
              <button onClick={closeMenu} className="absolute top-6 right-6 text-white/50 hover:text-white">
                <X className="w-8 h-8" />
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-2xl font-serif font-light text-white ${link.highlight ? 'text-gold-500' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
               {user ? (
                 <button
                   onClick={() => {
                     onLogout();
                     closeMenu();
                   }}
                   className="text-xl text-red-400 text-left pt-6"
                 >
                   Logout
                 </button>
               ) : (
                 <Link
                   to="/login"
                   onClick={closeMenu}
                   className="text-xl text-white/60 pt-6"
                 >
                   Member Login
                 </Link>
               )}
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-white pt-20 pb-10 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <Church className="h-8 w-8 text-gold-500 mr-3" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-2xl tracking-wide leading-none">GRACE</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">Chapel</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                We exist to lead people into a life-changing relationship with Jesus Christ. Join us this Sunday.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/40 hover:text-gold-500 transition"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="text-white/40 hover:text-gold-500 transition"><Facebook className="w-5 h-5"/></a>
                <a href="#" className="text-white/40 hover:text-gold-500 transition"><Youtube className="w-5 h-5"/></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-xl mb-6 text-gold-500">Explore</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link to="/about" className="hover:text-white transition-colors duration-200">Our Story</Link></li>
                <li><Link to="/sermons" className="hover:text-white transition-colors duration-200">Sermon Archive</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors duration-200">Events Calendar</Link></li>
                <li><Link to="/giving" className="hover:text-white transition-colors duration-200">Ways to Give</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-6 text-gold-500">Visit</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <span className="block text-white font-medium mb-1">Sunday Service</span>
                  9:00 AM & 11:00 AM
                </li>
                <li>
                  <span className="block text-white font-medium mb-1">Wednesday Night</span>
                  7:00 PM Bible Study
                </li>
                <li className="pt-2">123 Grace Avenue, Lagos, NG</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-6 text-gold-500">Newsletter</h3>
              <p className="text-white/60 text-sm mb-4">Subscribe for weekly updates and inspiration.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-md text-sm text-white focus:outline-none focus:border-gold-500 w-full" />
                <button className="bg-gold-500 text-brand-900 px-4 py-2 rounded-r-md font-medium hover:bg-gold-400 transition">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>© {new Date().getFullYear()} Grace Chapel. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;