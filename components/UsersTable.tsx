'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  first_name: string;
  registered_at: string;
}

interface UsersTableProps {
  limit?: number;
}

export default function UsersTable({ limit }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('registered_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortBy, sortOrder, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Mock API call
      const mockUsers: User[] = [
        { id: 1, username: 'ahmet_yilmaz', first_name: 'Ahmet', registered_at: '2024-01-15T10:30:00Z' },
        { id: 2, username: 'ayse_kaya', first_name: 'Ayşe', registered_at: '2024-01-14T09:15:00Z' },
        { id: 3, username: 'mehmet_demir', first_name: 'Mehmet', registered_at: '2024-01-13T14:45:00Z' },
        { id: 4, username: 'fatma_ozkan', first_name: 'Fatma', registered_at: '2024-01-12T16:20:00Z' },
        { id: 5, username: 'mustafa_cetin', first_name: 'Mustafa', registered_at: '2024-01-11T11:10:00Z' },
        { id: 6, username: 'zeynep_aksoy', first_name: 'Zeynep', registered_at: '2024-01-10T13:35:00Z' },
        { id: 7, username: 'ibrahim_kurt', first_name: 'İbrahim', registered_at: '2024-01-09T08:50:00Z' },
        { id: 8, username: 'elif_yaman', first_name: 'Elif', registered_at: '2024-01-08T15:25:00Z' }
      ];

      const filteredUsers = mockUsers.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const displayUsers = limit ? filteredUsers.slice(0, limit) : filteredUsers;
      setUsers(displayUsers);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
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
            Kayıtlı Kullanıcılar
          </h3>
          {!limit && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Kullanıcı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium cursor-pointer">
                <i className="ri-download-line mr-2"></i>
                Dışa Aktar
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
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  <i className={`ri-arrow-${sortBy === 'id' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('username')}
              >
                <div className="flex items-center space-x-1">
                  <span>Kullanıcı Adı</span>
                  <i className={`ri-arrow-${sortBy === 'username' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('first_name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Ad</span>
                  <i className={`ri-arrow-${sortBy === 'first_name' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('registered_at')}
              >
                <div className="flex items-center space-x-1">
                  <span>Kayıt Tarihi</span>
                  <i className={`ri-arrow-${sortBy === 'registered_at' && sortOrder === 'desc' ? 'down' : 'up'}-line text-xs`}></i>
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
                <td colSpan={5} className="px-6 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Yükleniyor...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Kullanıcı bulunamadı
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-user-line text-blue-600 text-sm"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900">@{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.first_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.registered_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 cursor-pointer">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!limit && users.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{users.length}</span> kullanıcı gösteriliyor
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