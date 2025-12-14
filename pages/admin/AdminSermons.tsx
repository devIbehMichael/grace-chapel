import React, { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Sermon } from '../../types';
import { Plus, Trash2, Video } from 'lucide-react';

const AdminSermons: React.FC = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', video_url: '', date: '', preacher: '', thumbnail: '' });

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    const data = await dataService.getSermons();
    setSermons(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this sermon?')) {
      await dataService.deleteSermon(id);
      loadSermons();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.addSermon({
        ...formData,
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1544427920-24e832256f03?q=80&w=2070&auto=format&fit=crop',
    });
    setIsFormOpen(false);
    setFormData({ title: '', description: '', video_url: '', date: '', preacher: '', thumbnail: '' });
    loadSermons();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-brand-900">Manage Sermons</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-brand-900 text-white px-6 py-2 rounded-lg flex items-center hover:bg-brand-800 transition shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Sermon
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-brand-900">Add New Sermon</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preacher</label>
                    <input required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.preacher} onChange={e => setFormData({...formData, preacher: e.target.value})} />
                </div>
                 <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (Embed)</label>
                    <input required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input required type="date" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea required rows={3} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-brand-900 text-white rounded-lg hover:bg-brand-800 transition">Save Sermon</button>
                </div>
            </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Preacher</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sermons.map(sermon => (
              <tr key={sermon.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{sermon.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sermon.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sermon.preacher}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(sermon.id)} className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSermons;