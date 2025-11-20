import React, { useEffect } from 'react';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import { AuthLayout } from '../common/AuthLayout';
import { MessageAlert } from '../common/MessageAlert';
import { PasswordForm } from './PasswordForm';
import { TokenValidation } from './TokenValidation';

export const ResetPassword: React.FC = () => {
  const {
    token,
    tokenValid,
    formData,
    message,
    loading,
    handleTokenValidation,
    handleSubmit,
    updateFormData,
    setMessage
  } = useResetPassword();

  useEffect(() => {
    if (token) {
      handleTokenValidation();
    }
  }, [token]);

  if (tokenValid === null) {
    return <TokenValidation type="loading" />;
  }

  if (!tokenValid) {
    return <TokenValidation type="invalid" message={message} />;
  }

  return (
    <AuthLayout title="auth:resetPassword" showLogo={true}>
      <MessageAlert 
        message={message} 
        type={message.includes('Succès') ? 'success' : 'error'}
        onDismiss={() => setMessage('')}
      />
      
      <PasswordForm
        formData={formData}
        loading={loading}
        onSubmit={handleSubmit}
        onFieldChange={updateFormData}
        submitText={loading ? 'auth:resetting' : 'auth:resetPassword'}
      />
    </AuthLayout>
  );
};