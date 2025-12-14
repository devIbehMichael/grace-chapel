import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Sermon } from '../types';
import { PlayCircle, Calendar, User, Loader2 } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Sermons: React.FC = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await dataService.getSermons();
        setSermons(data);
      } finally {
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-cream-50">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="bg-cream-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-4">Sermon Archive</h1>
            <p className="text-gray-500 text-lg">Watch, listen, and grow.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sermons.map((sermon, index) => (
            <FadeIn key={sermon.id} delay={index * 100}>
              <Link to={`/sermons/${sermon.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-xs text-gold-600 font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(sermon.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-900 mb-3 group-hover:text-gold-600 transition-colors">{sermon.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <User className="w-4 h-4 mr-2" />
                    {sermon.preacher}
                  </div>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">{sermon.description}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sermons;