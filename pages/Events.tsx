import React, { useEffect, useState } from 'react';
import { dataService } from '../services/dataService';
import { Event } from '../types';
import { Clock, MapPin, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await dataService.getEvents();
        const sorted = data.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
        setEvents(sorted);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-4">Calendar</h1>
            <p className="text-gray-500 text-lg">Gatherings, small groups, and special services.</p>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {events.length === 0 ? (
            <p className="text-center text-gray-500">No upcoming events scheduled.</p>
          ) : (
            events.map((event, index) => (
              <FadeIn key={event.id} delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row border-l-4 border-gold-500">
                  <div className="bg-brand-50 p-8 md:w-48 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-100">
                    <span className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">
                      {new Date(event.event_date).toLocaleString('default', { month: 'long' })}
                    </span>
                    <span className="text-brand-900 font-serif font-bold text-5xl mb-1">
                      {new Date(event.event_date).getDate()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(event.event_date).toLocaleDateString('default', { weekday: 'long' })}
                    </span>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-brand-900 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-6 font-light">{event.description}</p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gold-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gold-500" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center pr-8 pl-4">
                    <button className="whitespace-nowrap px-6 py-2 border border-brand-200 rounded-full text-brand-600 text-sm font-medium hover:bg-brand-50 transition">
                      Details
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;