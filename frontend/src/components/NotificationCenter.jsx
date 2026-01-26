import React, { useEffect, useState } from 'react';
import { notificationService } from '../services/notificationService';
import { FaBell, FaTimes } from 'react-icons/fa';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    // Setup listener para novas notificações
    notificationService.setupNotificationListener();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await notificationService.getNotificationHistory(null, 10);
      setNotifications(data.notifications || []);
      setUnreadCount(data.notifications?.filter(n => !n.read).length || 0);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markNotificationAsRead(notificationId);
      loadNotifications();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      loadNotifications();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'payment':
        return '💰';
      case 'bonus':
        return '🏆';
      case 'rating':
        return '⭐';
      case 'admin':
        return '📢';
      default:
        return '🔔';
    }
  };

  return (
    <div className=\"relative\">\n      {/* Botão de sino */}\n      <button\n        onClick={() => setIsOpen(!isOpen)}\n        className=\"relative p-2 text-gray-400 hover:text-white transition\"\n      >\n        <FaBell className=\"text-xl\" />\n        {unreadCount > 0 && (\n          <span className=\"absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center\">\n            {unreadCount > 99 ? '99+' : unreadCount}\n          </span>\n        )}\n      </button>\n\n      {/* Dropdown de notificações */}\n      {isOpen && (\n        <div className=\"absolute right-0 mt-2 w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50\">\n          {/* Header */}\n          <div className=\"p-4 border-b border-gray-700 flex items-center justify-between\">\n            <h3 className=\"font-bold text-white\">🔔 Notificações</h3>\n            <button\n              onClick={() => setIsOpen(false)}\n              className=\"text-gray-400 hover:text-white transition\"\n            >\n              <FaTimes />\n            </button>\n          </div>\n\n          {/* Content */}\n          <div className=\"max-h-96 overflow-y-auto\">\n            {isLoading ? (\n              <div className=\"p-8 text-center text-gray-400\">Carregando...</div>\n            ) : notifications.length > 0 ? (\n              notifications.map((notification) => (\n                <div\n                  key={notification.id}\n                  className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition cursor-pointer ${\n                    notification.read ? '' : 'bg-gray-700 bg-opacity-50'\n                  }`}\n                >\n                  <div className=\"flex items-start justify-between gap-3\">\n                    <div className=\"flex items-start gap-3 flex-1\">\n                      <span className=\"text-2xl\">{getNotificationIcon(notification.type)}</span>\n                      <div className=\"flex-1\">\n                        <p className=\"font-semibold text-white text-sm\">{notification.title}</p>\n                        <p className=\"text-gray-300 text-xs mt-1\">{notification.message}</p>\n                        <p className=\"text-gray-500 text-xs mt-2\">\n                          {new Date(notification.createdAt).toLocaleDateString('pt-BR')}\n                        </p>\n                      </div>\n                    </div>\n                    {!notification.read && (\n                      <button\n                        onClick={() => handleMarkAsRead(notification.id)}\n                        className=\"text-blue-400 hover:text-blue-300 text-xs font-semibold whitespace-nowrap\"\n                      >\n                        Marcar\n                      </button>\n                    )}\n                  </div>\n                  <div className=\"flex justify-end gap-2 mt-2\">\n                    <button\n                      onClick={() => handleDelete(notification.id)}\n                      className=\"text-red-400 hover:text-red-300 text-xs font-semibold\"\n                    >\n                      Deletar\n                    </button>\n                  </div>\n                </div>\n              ))\n            ) : (\n              <div className=\"p-8 text-center text-gray-400\">\n                <FaBell className=\"text-4xl mx-auto mb-2 opacity-50\" />\n                <p>Nenhuma notificação</p>\n              </div>\n            )}\n          </div>\n\n          {/* Footer */}\n          {notifications.length > 0 && (\n            <div className=\"p-3 border-t border-gray-700 text-center\">\n              <button className=\"text-blue-400 hover:text-blue-300 text-sm font-semibold\">\n                Ver todas as notificações\n              </button>\n            </div>\n          )}\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default NotificationCenter;
