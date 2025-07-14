'use client';

import { useState, useEffect } from 'react';

interface Announcement {
  id: number;
  admin_id: number;
  message: string;
  created_at: string;
  type: 'announcement' | 'bulk_message';
  status: 'sent' | 'pending' | 'failed';
}

interface BulkMessageStats {
  id: number;
  admin_id: number;
  message: string;
  created_at: string;
  success_count: number;
  fail_count: number;
}

export default function AnnouncementsHistory() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [bulkStats, setBulkStats] = useState<BulkMessageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock API calls
      const mockAnnouncements: Announcement[] = [
        { id: 1, admin_id: 1, message: 'Sistem bakımı nedeniyle bot 1 saat süreyle çevrimdışı olacak.', created_at: '2024-01-15T10:30:00Z', type: 'announcement', status: 'sent' },
        { id: 2, admin_id: 1, message: 'Yeni özellikler eklendi! Detaylar için /help komutunu kullanın.', created_at: '2024-01-14T15:45:00Z', type: 'announcement', status: 'sent' },
        { id: 3, admin_id: 1, message: 'Puan sistemi güncellendi. Daha fazla puan kazanma fırsatları!', created_at: '2024-01-13T09:20:00Z', type: 'announcement', status: 'sent' },
        { id: 4, admin_id: 1, message: 'Haftalık yarışma başlıyor! En aktif grup ödül kazanacak.', created_at: '2024-01-12T14:10:00Z', type: 'announcement', status: 'sent' },
        { id: 5, admin_id: 1, message: 'Bot güvenlik güncellemesi tamamlandı.', created_at: '2024-01-11T11:30:00Z', type: 'announcement', status: 'sent' }
      ];

      const mockBulkStats: BulkMessageStats[] = [
        { id: 1, admin_id: 1, message: 'Merhaba! Yeni özelliklerimizi keşfedin.', created_at: '2024-01-15T08:00:00Z', success_count: 1205, fail_count: 42 },
        { id: 2, admin_id: 1, message: 'Özel indirim kampanyamız başladı!', created_at: '2024-01-10T12:00:00Z', success_count: 1180, fail_count: 67 },
        { id: 3, admin_id: 1, message: 'Haftalık özet: En çok puan kazanan gruplar', created_at: '2024-01-08T16:30:00Z', success_count: 1156, fail_count: 91 },
        { id: 4, admin_id: 1, message: 'Sistem performans iyileştirmeleri yapıldı', created_at: '2024-01-05T10:15:00Z', success_count: 1134, fail_count: 113 }
      ];

      const filteredAnnouncements = mockAnnouncements.filter(item => 
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredBulkStats = mockBulkStats.filter(item => 
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setAnnouncements(filteredAnnouncements);
      setBulkStats(filteredBulkStats);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'failed': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Gönderildi';
      case 'pending': return 'Beklemede';
      case 'failed': return 'Başarısız';
      default: return 'Bilinmiyor';
    }
  };

  const calculateSuccessRate = (success: number, fail: number) => {
    const total = success + fail;
    return total > 0 ? ((success / total) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === 'announcements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Duyuru Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('bulk-stats')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === 'bulk-stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Toplu Mesaj İstatistikleri
            </button>
          </nav>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'announcements' ? 'Duyuru Geçmişi' : 'Toplu Mesaj İstatistikleri'}
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Yükleniyor...</span>
            </div>
          </div>
        ) : activeTab === 'announcements' ? (
          <div className="divide-y divide-gray-200">
            {announcements.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Duyuru bulunamadı
              </div>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-notification-line text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Duyuru #{announcement.id}</p>
                          <p className="text-xs text-gray-500">{formatDate(announcement.created_at)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-800 mb-3 ml-11">
                        {announcement.message}
                      </p>
                      <div className="flex items-center justify-between ml-11">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                          {getStatusText(announcement.status)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                            <i className="ri-eye-line"></i>
                          </button>
                          <button className="text-gray-400 hover:text-green-600 cursor-pointer">
                            <i className="ri-repeat-line"></i>
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
        ) : (
          <div className="divide-y divide-gray-200">
            {bulkStats.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                İstatistik bulunamadı
              </div>
            ) : (
              bulkStats.map((stat) => (
                <div key={stat.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="ri-message-line text-purple-600 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Toplu Mesaj #{stat.id}</p>
                          <p className="text-xs text-gray-500">{formatDate(stat.created_at)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-800 mb-4 ml-11">
                        {stat.message}
                      </p>
                      <div className="ml-11">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <i className="ri-check-line text-green-600 mr-2"></i>
                              <div>
                                <p className="text-sm font-medium text-green-800">Başarılı</p>
                                <p className="text-xl font-bold text-green-600">{stat.success_count.toLocaleString('tr-TR')}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <i className="ri-close-line text-red-600 mr-2"></i>
                              <div>
                                <p className="text-sm font-medium text-red-800">Başarısız</p>
                                <p className="text-xl font-bold text-red-600">{stat.fail_count.toLocaleString('tr-TR')}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <i className="ri-percent-line text-blue-600 mr-2"></i>
                              <div>
                                <p className="text-sm font-medium text-blue-800">Başarı Oranı</p>
                                <p className="text-xl font-bold text-blue-600">%{calculateSuccessRate(stat.success_count, stat.fail_count)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${calculateSuccessRate(stat.success_count, stat.fail_count)}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                              <i className="ri-bar-chart-line"></i>
                            </button>
                            <button className="text-gray-400 hover:text-green-600 cursor-pointer">
                              <i className="ri-download-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}