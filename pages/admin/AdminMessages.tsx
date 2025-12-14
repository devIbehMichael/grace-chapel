import React, { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Message } from '../../types';
import { Mail, Check } from 'lucide-react';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await dataService.getMessages();
    // Sort new first
    setMessages(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  const markRead = async (id: string) => {
    await dataService.markMessageRead(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inbox</h1>
      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : messages.map(msg => (
          <div key={msg.id} className={`bg-white p-6 rounded-lg shadow-sm border ${msg.read ? 'border-gray-200 opacity-75' : 'border-brand-200 ring-1 ring-brand-100'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Mail className={`w-5 h-5 mr-2 ${msg.read ? 'text-gray-400' : 'text-brand-500'}`} />
                <span className="font-bold text-gray-900">{msg.name}</span>
                <span className="text-gray-500 text-sm ml-2">({msg.email})</span>
              </div>
              <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mt-2">{msg.message}</p>
            {!msg.read && (
              <button 
                onClick={() => markRead(msg.id)}
                className="mt-4 text-sm text-brand-600 hover:text-brand-800 flex items-center"
              >
                <Check className="w-4 h-4 mr-1" /> Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;