'use client';

import { useState, useEffect } from 'react';

interface GroupMessage {
  id: number;
  group_id: number;
  group_name: string;
  user_id: number;
  username: string;
  content_type: string;
  content_text: string;
  created_at: string;
}

export default function RecentMessages() {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [filter, searchTerm]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Mock API call for last 50 group messages
      const mockMessages: GroupMessage[] = [
        { id: 1, group_id: 1, group_name: 'Teknoloji Sohbet', user_id: 101, username: 'ahmet_yilmaz', content_type: 'text', content_text: 'Yeni teknoloji haberleri çok ilginç!', created_at: '2024-01-15T14:30:00Z' },
        { id: 2, group_id: 2, group_name: 'Oyun Severler', user_id: 102, username: 'ayse_kaya', content_type: 'photo', content_text: '[Fotoğraf]', created_at: '2024-01-15T14:25:00Z' },
        { id: 3, group_id: 1, group_name: 'Teknoloji Sohbet', user_id: 103, username: 'mehmet_demir', content_type: 'text', content_text: 'Bu konuda daha fazla bilgi paylaşabilir misiniz?', created_at: '2024-01-15T14:20:00Z' },
        { id: 4, group_id: 3, group_name: 'Müzik Dünyası', user_id: 104, username: 'fatma_ozkan', content_type: 'audio', content_text: '[Ses Kaydı]', created_at: '2024-01-15T14:15:00Z' },
        { id: 5, group_id: 2, group_name: 'Oyun Severler', user_id: 105, username: 'mustafa_cetin', content_type: 'text', content_text: 'Yeni çıkan oyun çok başarılı görünüyor', created_at: '2024-01-15T14:10:00Z' },
        { id: 6, group_id: 4, group_name: 'Spor Haberleri', user_id: 106, username: 'zeynep_aksoy', content_type: 'video', content_text: '[Video]', created_at: '2024-01-15T14:05:00Z' },
        { id: 7, group_id: 1, group_name: 'Teknoloji Sohbet', user_id: 107, username: 'ibrahim_kurt', content_type: 'text', content_text: 'Yapay zeka gelişmeleri hakkında ne düşünüyorsunuz?', created_at: '2024-01-15T14:00:00Z' },
        { id: 8, group_id: 5, group_name: 'Yemek Tarifleri', user_id: 108, username: 'elif_yaman', content_type: 'photo', content_text: '[Fotoğraf]', created_at: '2024-01-15T13:55:00Z' },
        { id: 9, group_id: 3, group_name: 'Müzik Dünyası', user_id: 109, username: 'ali_koc', content_type: 'text', content_text: 'Bu şarkıyı dinlemenizi tavsiye ederim', created_at: '2024-01-15T13:50:00Z' },
        { id: 10, group_id: 6, group_name: 'Film Eleştirileri', user_id: 110, username: 'merve_tas', content_type: 'text', content_text: 'Son izlediğim film gerçekten etkileyiciydi', created_at: '2024-01-15T13:45:00Z' }
      ];

      const filteredMessages = mockMessages.filter(message => {
        const matchesFilter = filter === 'all' || message.content_type === filter;
        const matchesSearch = message.content_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.group_name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      });

      setMessages(filteredMessages);
    } catch (error) {
      console.error('Mesajlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return 'ri-message-line';
      case 'photo': return 'ri-image-line';
      case 'video': return 'ri-video-line';
      case 'audio': return 'ri-mic-line';
      case 'document': return 'ri-file-line';
      default: return 'ri-message-line';
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'text-blue-600 bg-blue-100';
      case 'photo': return 'text-green-600 bg-green-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'audio': return 'text-yellow-600 bg-yellow-100';
      case 'document': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">
            Son 50 Grup Mesajı
          </h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Mesaj ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
            >
              <option value="all">Tüm Mesajlar</option>
              <option value="text">Metin</option>
              <option value="photo">Fotoğraf</option>
              <option value="video">Video</option>
              <option value="audio">Ses</option>
              <option value="document">Belge</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Yükleniyor...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Mesaj bulunamadı
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getContentTypeColor(message.content_type)}`}>
                  <i className={`${getContentTypeIcon(message.content_type)} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">@{message.username}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-blue-600 font-medium">{message.group_name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-800 break-words">
                    {message.content_text}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(message.content_type)}`}>
                      <i className={`${getContentTypeIcon(message.content_type)} mr-1`}></i>
                      {message.content_type === 'text' ? 'Metin' :
                       message.content_type === 'photo' ? 'Fotoğraf' :
                       message.content_type === 'video' ? 'Video' :
                       message.content_type === 'audio' ? 'Ses' : 'Belge'}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-gray-400 hover:text-red-600 cursor-pointer">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Toplam {messages.length} mesaj gösteriliyor</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
            Tümünü Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
}