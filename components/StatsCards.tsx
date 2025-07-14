'use client';

import { useState, useEffect } from 'react';

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGroups: 0,
    totalPoints: 0,
    todayMessages: 0
  });

  useEffect(() => {
    // Mock API call
    const fetchStats = async () => {
      // Simulating API response
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          totalGroups: 23,
          totalPoints: 45680,
          todayMessages: 892
        });
      }, 1000);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Toplam Kullanıcı',
      value: stats.totalUsers.toLocaleString('tr-TR'),
      icon: 'ri-user-line',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Aktif Gruplar',
      value: stats.totalGroups.toLocaleString('tr-TR'),
      icon: 'ri-group-line',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Toplam Puan',
      value: stats.totalPoints.toLocaleString('tr-TR'),
      icon: 'ri-trophy-line',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Bugünkü Mesajlar',
      value: stats.todayMessages.toLocaleString('tr-TR'),
      icon: 'ri-message-line',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-xl ${card.textColor}`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-sm text-green-600">
              <i className="ri-arrow-up-line mr-1"></i>
              <span>+12%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">son haftaya göre</span>
          </div>
        </div>
      ))}
    </div>
  );
}