import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Sermon } from '../types';
import { ArrowLeft, Calendar, User, Share2, Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const SermonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const all = await dataService.getSermons();
      const found = all.find(s => s.id === id);
      setSermon(found || null);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-brand-900"></div>;
  if (!sermon) return <div className="pt-32 text-center">Sermon not found.</div>;

  return (
    <div className="bg-brand-900 min-h-screen text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/sermons" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Archive
        </Link>
        
        {/* Video Player */}
        <FadeIn>
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-2xl overflow-hidden shadow-2xl mb-12 ring-1 ring-white/10">
            <iframe 
              className="w-full h-[300px] md:h-[600px]"
              src={sermon.video_url} 
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{sermon.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gold-500" />
                  {new Date(sermon.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gold-500" />
                  {sermon.preacher}
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold text-white mb-4">About this Message</h3>
                <p className="text-white/80 leading-relaxed text-lg">{sermon.description}</p>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-1">
             <FadeIn delay={200}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Resources</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm">
                    <span>Download Audio</span>
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm">
                    <span>Sermon Notes</span>
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm">
                    <span>Share Message</span>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
             </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SermonDetails;