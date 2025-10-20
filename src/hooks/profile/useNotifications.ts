import { useState } from 'react';

export type NotificationPreferencesType = {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
};

export const useNotifications = (initialPreferences?: NotificationPreferencesType) => {
  const [notifications, setNotifications] = useState<NotificationPreferencesType>(
    initialPreferences || {
      email: true,
      whatsapp: true,
      sms: false
    }
  );

  const updateNotification = (key: keyof NotificationPreferencesType, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    notifications,
    updateNotification,
    setNotifications
  };
};