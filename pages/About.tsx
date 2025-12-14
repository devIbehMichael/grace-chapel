import React from 'react';
import FadeIn from '../components/FadeIn';

const About: React.FC = () => {
  return (
    <div className="bg-cream-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-serif text-brand-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              We are a community of ordinary people seeking extraordinary transformation through the love of Jesus Christ.
            </p>
          </div>
        </FadeIn>

        {/* Content Block 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn>
            <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" 
              alt="Church Interior" 
              className="rounded-lg shadow-2xl"
            />
          </FadeIn>
          <FadeIn delay={200}>
            <div>
              <div className="h-1 w-20 bg-gold-500 mb-8"></div>
              <h2 className="text-3xl font-serif text-brand-900 mb-6">Rooted in Faith</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 1995, Grace Chapel started with a simple vision: to create a space where people could come as they are and encounter the life-changing power of the Gospel.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the years, we have grown from a small living room gathering to a vibrant community serving our city. Our journey is a testament to God's faithfulness and the power of prayer.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Values Grid */}
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-sm p-12 mb-32 border border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-brand-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-brand-900 font-serif font-bold text-2xl">01</span>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">Authentic Community</h3>
                <p className="text-gray-600 text-sm">We do life together, embracing vulnerability and genuine connection.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-brand-900 font-serif font-bold text-2xl">02</span>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">Relentless Love</h3>
                <p className="text-gray-600 text-sm">We are driven by love for God and love for our neighbors.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-brand-900 font-serif font-bold text-2xl">03</span>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">Active Service</h3>
                <p className="text-gray-600 text-sm">We serve our city with compassion, humility, and generosity.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Pastor Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <FadeIn delay={200} className="md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
              alt="Pastor" 
              className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
            />
          </FadeIn>
          <FadeIn className="md:order-1">
            <div className="md:text-right">
              <h2 className="text-3xl font-serif text-brand-900 mb-2">Rev. David Williams</h2>
              <p className="text-gold-600 font-medium tracking-wide uppercase text-sm mb-6">Senior Pastor</p>
              <blockquote className="text-xl font-serif italic text-gray-500 mb-6">
                "My heart burns to see a generation rise up that knows their God and does great exploits."
              </blockquote>
              <p className="text-gray-600 leading-relaxed">
                Pastor David has served at Grace Chapel for over 15 years. He is a gifted communicator passionate about making the complex simple and the spiritual practical. He lives in Lagos with his wife and three children.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default About;