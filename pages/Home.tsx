import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Calendar, MapPin } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Cinematic Hero */}
      <div className="relative h-screen w-full flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop")' 
          }}
        >
          <div className="absolute inset-0 bg-brand-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <FadeIn>
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6">Welcome Home</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-8 leading-tight">
              Faith. Hope. <br/> <span className="italic text-gold-500">Love.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              "For where two or three are gathered in my name, there am I among them."
              <br/><span className="text-sm opacity-60 mt-2 block">— Matthew 18:20</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/sermons" 
                className="bg-gold-500 text-brand-900 font-medium py-4 px-8 rounded-full transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/20 flex items-center justify-center min-w-[200px]"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Latest Sermon
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border border-white/30 text-white font-medium py-4 px-8 rounded-full transition-all hover:bg-white hover:text-brand-900 flex items-center justify-center min-w-[200px]"
              >
                Plan A Visit
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* Intro Section - Overlapping Layout */}
      <section className="bg-cream-50 relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={200}>
            <div className="bg-white relative -mt-20 md:-mt-32 rounded-lg shadow-xl p-8 md:p-16 border-t-4 border-gold-500">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-900 mb-6">A Church for the City</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 font-light text-lg">
                    At Grace Chapel, we believe that church is more than a building—it's a family. 
                    No matter your background or story, you are welcome here. We are dedicated to 
                    creating a space where people can encounter Jesus, discover their purpose, 
                    and make a difference.
                  </p>
                  <Link to="/about" className="text-brand-600 font-medium tracking-wide border-b border-brand-600 pb-1 hover:text-gold-500 hover:border-gold-500 transition-colors inline-flex items-center group">
                    Our Story <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 border border-gold-200 rounded-lg transform translate-x-4 translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" 
                    alt="Community Gathering" 
                    className="relative rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Get Involved</p>
              <h2 className="text-4xl font-serif text-brand-900">Experience Grace</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <Link to="/sermons" className="group relative block h-96 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop")' }}></div>
                <div className="absolute inset-0 bg-brand-900/60 group-hover:bg-brand-900/50 transition-colors"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <Play className="w-12 h-12 text-white mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <h3 className="text-2xl font-serif text-white mb-2">Watch Online</h3>
                  <p className="text-white/70">Catch up on recent messages anytime, anywhere.</p>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={200}>
              <Link to="/events" className="group relative block h-96 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop")' }}></div>
                <div className="absolute inset-0 bg-brand-900/60 group-hover:bg-brand-900/50 transition-colors"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <Calendar className="w-12 h-12 text-white mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <h3 className="text-2xl font-serif text-white mb-2">Upcoming Events</h3>
                  <p className="text-white/70">See what's happening this week at Grace.</p>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={300}>
              <Link to="/contact" className="group relative block h-96 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574625299691-10521e428c94?q=80&w=2072&auto=format&fit=crop")' }}></div>
                <div className="absolute inset-0 bg-brand-900/60 group-hover:bg-brand-900/50 transition-colors"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <MapPin className="w-12 h-12 text-white mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <h3 className="text-2xl font-serif text-white mb-2">Visit Us</h3>
                  <p className="text-white/70">Service times, directions, and what to expect.</p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-brand-900 text-center px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-8">
              "To know God and make Him known."
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Home;