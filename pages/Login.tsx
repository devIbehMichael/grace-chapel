import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { User } from '../types';
import { Lock, Church } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await dataService.login(email);
      onLogin(user);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream-50">
      {/* Visual Side (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-brand-900 text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-lg text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">Welcome Back</h1>
            <p className="text-xl text-white/80 font-light">"I was glad when they said to me, 'Let us go to the house of the Lord!'" — Psalm 122:1</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <FadeIn className="max-w-md w-full space-y-8 bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
             <Church className="w-12 h-12 text-gold-500 mx-auto mb-4" />
             <h2 className="text-3xl font-serif font-bold text-gray-900">Sign in</h2>
             <p className="mt-2 text-gray-500">Access your account to manage giving or admin features.</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-brand-900 bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="text-center pt-4 border-t border-gray-100">
               <p className="text-sm text-gray-500 mb-2">Demo Credentials:</p>
               <button
                type="button"
                onClick={() => setEmail('admin@gracechapel.com')}
                className="text-sm text-brand-600 hover:text-brand-800 font-medium underline"
               >
                 Auto-fill Admin Email
               </button>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  );
};

export default Login;