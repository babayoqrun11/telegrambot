'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import UsersTable from '../components/UsersTable';
import GroupsTable from '../components/GroupsTable';
import AdminPanel from '../components/AdminPanel';
import RecentMessages from '../components/RecentMessages';
import AnnouncementsHistory from '../components/AnnouncementsHistory';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('genel');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Kimlik doğrulama kontrolü
    const checkAuth = async () => {
      try {
        // API çağrısı simülasyonu (buraya gerçek bir API de koyabilirsin)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Telegram Bot Yönetim Paneli</h1>
            <p className="text-red-600 font-medium">Yetkisiz Erişim</p>
            <p className="text-gray-600 mt-2">Bu panele erişim için yetkiniz bulunmamaktadır.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">
              Lütfen sistem yöneticisi ile iletişime geçin veya geçerli kimlik bilgilerinizle giriş yapın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Telegram Bot Yönetim Paneli</h1>
          <p className="text-gray-600">Bot ve kullanıcı verilerini yönetin</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'genel', label: 'Genel Bakış', icon: 'ri-dashboard-line' },
                { id: 'kullanicilar', label: 'Kullanıcılar', icon: 'ri-user-line' },
                { id: 'gruplar', label: 'Gruplar', icon: 'ri-group-line' },
                { id: 'yonetim', label: 'Yönetim', icon: 'ri-settings-line' },
                { id: 'mesajlar', label: 'Mesajlar', icon: 'ri-message-line' },
                { id: 'duyurular', label: 'Duyurular', icon: 'ri-notification-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'genel' && (
            <div className="space-y-8">
              <StatsCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UsersTable limit={5} />
                <GroupsTable limit={5} />
              </div>
            </div>
          )}
          
          {activeTab === 'kullanicilar' && <UsersTable />}
          
          {activeTab === 'gruplar' && <GroupsTable />}
          
          {activeTab === 'yonetim' && <AdminPanel />}
          
          {activeTab === 'mesajlar' && <RecentMessages />}
          
          {activeTab === 'duyurular' && <AnnouncementsHistory />}
        </div>
      </div>
    </div>
  );
}