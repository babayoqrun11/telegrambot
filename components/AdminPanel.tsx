'use client';

import { useState } from 'react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    adminId: '',
    groupId: '',
    groupName: '',
    points: '',
    message: '',
    mediaType: 'text'
  });

  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let successMessage = '';
      switch (modalType) {
        case 'addAdmin':
          successMessage = 'Yönetici başarıyla eklendi';
          break;
        case 'removeAdmin':
          successMessage = 'Yönetici başarıyla kaldırıldı';
          break;
        case 'addGroup':
          successMessage = 'Grup başarıyla eklendi';
          break;
        case 'removeGroup':
          successMessage = 'Grup başarıyla kaldırıldı';
          break;
        case 'givePoints':
          successMessage = 'Puan başarıyla verildi';
          break;
        case 'removePoints':
          successMessage = 'Puan başarıyla kaldırıldı';
          break;
        case 'announcement':
          successMessage = 'Duyuru başarıyla gönderildi';
          break;
        case 'bulkMessage':
          successMessage = 'Toplu mesaj başarıyla gönderildi';
          break;
        case 'mediaAnnouncement':
          successMessage = 'Medya duyurusu başarıyla gönderildi';
          break;
      }
      
      showNotification('success', successMessage);
      setShowModal(false);
      setFormData({
        adminId: '',
        groupId: '',
        groupName: '',
        points: '',
        message: '',
        mediaType: 'text'
      });
    } catch (error) {
      showNotification('error', 'İşlem sırasında bir hata oluştu');
    }
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const adminActions = [
    { id: 'addAdmin', title: 'Yönetici Ekle', icon: 'ri-user-add-line', color: 'bg-blue-500', description: 'Yeni yönetici ekle' },
    { id: 'removeAdmin', title: 'Yönetici Kaldır', icon: 'ri-user-unfollow-line', color: 'bg-red-500', description: 'Mevcut yöneticiyi kaldır' },
    { id: 'addGroup', title: 'Grup Ekle', icon: 'ri-group-line', color: 'bg-green-500', description: 'Yeni grup ekle' },
    { id: 'removeGroup', title: 'Grup Kaldır', icon: 'ri-group-2-line', color: 'bg-orange-500', description: 'Mevcut grubu kaldır' },
    { id: 'givePoints', title: 'Puan Ver', icon: 'ri-add-circle-line', color: 'bg-yellow-500', description: 'Gruba puan ver' },
    { id: 'removePoints', title: 'Puan Kaldır', icon: 'ri-subtract-line', color: 'bg-purple-500', description: 'Gruptan puan kaldır' },
    { id: 'announcement', title: 'Duyuru Gönder', icon: 'ri-notification-line', color: 'bg-indigo-500', description: 'Tüm gruplara duyuru gönder' },
    { id: 'bulkMessage', title: 'Toplu Mesaj', icon: 'ri-message-line', color: 'bg-pink-500', description: 'Tüm kullanıcılara mesaj gönder' },
    { id: 'mediaAnnouncement', title: 'Medya Duyurusu', icon: 'ri-image-line', color: 'bg-teal-500', description: 'Medya ile duyuru gönder' }
  ];

  const getModalTitle = () => {
    const action = adminActions.find(a => a.id === modalType);
    return action ? action.title : '';
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'addAdmin':
      case 'removeAdmin':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yönetici ID
              </label>
              <input
                type="text"
                value={formData.adminId}
                onChange={(e) => setFormData({...formData, adminId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Yönetici ID'sini girin"
                required
              />
            </div>
          </div>
        );

      case 'addGroup':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grup ID
              </label>
              <input
                type="text"
                value={formData.groupId}
                onChange={(e) => setFormData({...formData, groupId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Grup ID'sini girin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grup Adı
              </label>
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => setFormData({...formData, groupName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Grup adını girin"
                required
              />
            </div>
          </div>
        );

      case 'removeGroup':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grup ID
              </label>
              <input
                type="text"
                value={formData.groupId}
                onChange={(e) => setFormData({...formData, groupId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Kaldırılacak grup ID'sini girin"
                required
              />
            </div>
          </div>
        );

      case 'givePoints':
      case 'removePoints':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grup ID
              </label>
              <input
                type="text"
                value={formData.groupId}
                onChange={(e) => setFormData({...formData, groupId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Grup ID'sini girin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Puan Miktarı
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({...formData, points: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Puan miktarını girin"
                required
              />
            </div>
          </div>
        );

      case 'announcement':
      case 'bulkMessage':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj İçeriği
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Gönderilecek mesajı yazın..."
                maxLength={500}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/500 karakter
              </p>
            </div>
          </div>
        );

      case 'mediaAnnouncement':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medya Türü
              </label>
              <select
                value={formData.mediaType}
                onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
              >
                <option value="text">Metin</option>
                <option value="photo">Fotoğraf</option>
                <option value="video">Video</option>
                <option value="document">Belge</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj İçeriği
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Medya ile birlikte gönderilecek mesajı yazın..."
                maxLength={500}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/500 karakter
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            <i className={`${notification.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} mr-2`}></i>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Admin Actions Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Yönetim Komutları</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminActions.map((action) => (
            <button
              key={action.id}
              onClick={() => openModal(action.id)}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 text-left cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <i className={`${action.icon} text-white text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mevcut Ayarlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Otomatik Yöneticiler</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700">@admin_user_1</span>
                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700">@admin_user_2</span>
                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Otomatik Gruplar</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700">Teknoloji Sohbet</span>
                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700">Oyun Severler</span>
                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{getModalTitle()}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4">
                {renderModalContent()}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}