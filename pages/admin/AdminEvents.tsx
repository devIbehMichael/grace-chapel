import React, { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Event } from '../../types';
import { Plus, Trash2, Calendar } from 'lucide-react';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', event_date: '', time: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await dataService.getEvents();
    setEvents(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await dataService.deleteEvent(id);
      loadEvents();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addEvent(formData);
    setIsFormOpen(false);
    setFormData({ title: '', description: '', location: '', event_date: '', time: '' });
    loadEvents();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Title" className="border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <input required placeholder="Location" className="border p-2 rounded" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                <input required type="date" className="border p-2 rounded" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} />
                <input required type="time" className="border p-2 rounded" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                <textarea required placeholder="Description" className="border p-2 rounded md:col-span-2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <div className="md:col-span-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded">Save Event</button>
                </div>
            </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event_date} {event.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvents;