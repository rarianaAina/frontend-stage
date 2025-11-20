import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordRequest, ResetPasswordFormData } from '../../types/auth';
import { useAppTranslation } from '../translation/useTranslation';
import { authService } from '../../services/authService';

export const useResetPassword = () => {
  const { t } = useAppTranslation(['auth', 'common']);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  
  const token = searchParams.get('token');

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const result = await authService.validateResetToken(token);
      return result.success;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const resetPassword = async (request: ResetPasswordRequest): Promise<boolean> => {
    try {
      const result = await authService.resetPassword(request);
      return result.success;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const handleTokenValidation = async () => {
    if (!token) {
      setTokenValid(false);
      setMessage(t('auth:invalidResetToken'));
      return;
    }

    try {
      const isValid = await validateToken(token);
      setTokenValid(isValid);
      
      if (!isValid) {
        setMessage(t('auth:invalidResetToken'));
      }
    } catch (error) {
      setTokenValid(false);
      setMessage(t('auth:resetTokenValidationError'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setMessage(t('auth:invalidResetToken'));
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage(t('auth:passwordMinLength'));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage(t('auth:passwordsDoNotMatch'));
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const success = await resetPassword({
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });

      if (success) {
        setMessage(t('auth:passwordResetSuccess'));
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(t('auth:passwordResetError'));
      }
    } catch (error) {
      setMessage(t('auth:passwordResetError'));
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof ResetPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    token,
    tokenValid,
    formData,
    message,
    loading,
    handleTokenValidation,
    handleSubmit,
    updateFormData,
    setMessage,
    setTokenValid
  };
};