'use client';

import { useState, useEffect } from 'react';

interface Group {
  group_id: number;
  group_name: string;
  puan: number;
  member_count: number;
  last_activity: string;
}

interface GroupsTableProps {
  limit?: number;
}

export default function GroupsTable({ limit }: GroupsTableProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('puan');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchGroups();
  }, [sortBy, sortOrder, searchTerm]);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      // Mock API call
      const mockGroups: Group[] = [
        { group_id: 1, group_name: 'Teknoloji Sohbet', puan: 15420, member_count: 245, last_activity: '2024-01-15T14:30:00Z' },
        { group_id: 2, group_name: 'Oyun Severler', puan: 12340, member_count: 189, last_activity: '2024-01-15T13:45:00Z' },
        { group_id: 3, group_name: 'Müzik Dünyası', puan: 9850, member_count: 156, last_activity: '2024-01-15T12:20:00Z' },
        { group_id: 4, group_name: 'Spor Haberleri', puan: 8750, member_count: 203, last_activity: '2024-01-15T11:15:00Z' },
        { group_id: 5, group_name: 'Yemek Tarifleri', puan: 7650, member_count: 134, last_activity: '2024-01-15T10:30:00Z' },
        { group_id: 6, group_name: 'Film Eleştirileri', puan: 6540, member_count: 98, last_activity: '2024-01-15T09:45:00Z' },
        { group_id: 7, group_name: 'Kitap Kulübü', puan: 5430, member_count: 87, last_activity: '2024-01-15T08:20:00Z' },
        { group_id: 8, group_name: 'Seyahat Rehberi', puan: 4320, member_count: 112, last_activity: '2024-01-14T16:10:00Z' }
      ];

      const filteredGroups = mockGroups.filter(group => 
        group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const displayGroups = limit ? filteredGroups.slice(0, limit) : filteredGroups;
      setGroups(displayGroups);
    } catch (error) {
      console.error('Gruplar yüklenirken hata:', error);
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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">
            Grup Puanları
          </h3>
          {!limit && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Grup ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium cursor-pointer">
                <i className="ri-add-line mr-2"></i>
                Puan Ver
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('group_id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sıra</span>
                  <i className={`ri-arrow-${sortBy === 'group_id' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('group_name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Grup Adı</span>
                  <i className={`ri-arrow-${sortBy === 'group_name' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('puan')}
              >
                <div className="flex items-center space-x-1">
                  <span>Puan</span>
                  <i className={`ri-arrow-${sortBy === 'puan' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('member_count')}
              >
                <div className="flex items-center space-x-1">
                  <span>Üye Sayısı</span>
                  <i className={`ri-arrow-${sortBy === 'member_count' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('last_activity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Son Aktivite</span>
                  <i className={`ri-arrow-${sortBy === 'last_activity' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Yükleniyor...</span>
                  </div>
                </td>
              </tr>
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Grup bulunamadı
                </td>
              </tr>
            ) : (
              groups.map((group, index) => (
                <tr key={group.group_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-group-line text-green-600 text-sm"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{group.group_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-yellow-600">{group.puan.toLocaleString('tr-TR')}</span>
                      <i className="ri-trophy-line text-yellow-500 ml-2"></i>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.member_count.toLocaleString('tr-TR')} üye
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(group.last_activity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                        <i className="ri-add-circle-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 cursor-pointer">
                        <i className="ri-subtract-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!limit && groups.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{groups.length}</span> grup gösteriliyor
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 cursor-pointer">
                Önceki
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 cursor-pointer">
                Sonraki
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}