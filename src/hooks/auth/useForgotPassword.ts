import { useState } from 'react';
import { useAppTranslation } from '../translation/useTranslation';
import { authService } from '../../services/authService';

export const useForgotPassword = () => {
  const { t } = useAppTranslation(['auth', 'common']);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendResetLink = async (email: string): Promise<boolean> => {
    try {
      const result = await authService.forgotPassword(email);
      return result.success;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const handleSubmit = async (email: string): Promise<void> => {
    if (!email) {
      setMessage(t('auth:enterEmailForReset'));
      return;
    }

    setIsSending(true);
    setMessage('');

    try {
      await sendResetLink(email);
      setMessage(t('auth:resetEmailSent'));
    } catch (error) {
      setMessage(t('auth:resetEmailError'));
    } finally {
      setIsSending(false);
    }
  };

  return {
    message,
    isSending,
    handleSubmit,
    setMessage
  };
};